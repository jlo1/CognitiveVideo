#include "../include/CarClassifier.hpp"

namespace traffic21
{
    CarClassifier::CarClassifier(cv::Size imgsize, float lengththreshold, float roadwidth)
    {
	size = imgsize;
	threshold = lengththreshold;
	road_width = roadwidth;
    }
    CarClassifier::~CarClassifier()
    {
    }
    void CarClassifier::classify(std::vector<Vehicle>* last_cars, std::vector<cv::Mat> road_lines)
    {
	//cv::Vec4f bottom = road_lines[0];//road_lines[0] is upper line
	cv::Mat bottom = road_lines[0];//road_lines[0] is upper line
	cv::Mat top = road_lines[1];//road_lines[1] is lower line
	float top_slope = top.at<float>(1)/top.at<float>(0);
	float top_intercept = top.at<float>(3) - (top_slope * top.at<float>(2));
	//slope and y intercept of bottom line
	float bottom_slope = bottom.at<float>(1)/bottom.at<float>(0);
	float bottom_intercept = bottom.at<float>(3) - (bottom_slope * bottom.at<float>(2));
	//intersection point of top and bottom lines
	float intersect_x = (bottom_intercept - top_intercept)/(top_slope - bottom_slope);
	float intersect_y = top_slope*intersect_x + top_intercept;
	cv::Point road_line_intersection(intersect_x,intersect_y);

	//x locations where road lines hit the bottom of the image
	float bottom_x = ((size.height - 1) - bottom_intercept)/bottom_slope;
	float top_x = ((size.height - 1) - top_intercept)/top_slope;
	cv::Point bottom_line_point(bottom_x,size.height - 1);
	cv::Point top_line_point(top_x,size.height - 1);

	float x_dist = bottom_x - road_line_intersection.x;
	float y_dist = size.height - road_line_intersection.y;
	float z = atan(x_dist/y_dist);
	//angle between the road lines
	float angle = atan((x_dist+(top_x-bottom_x))/y_dist) - z;
	//float angle_degrees = angle*180.0/3.14;
	if (last_cars->size() > 0) {
	    for (unsigned int i = 0; i < last_cars->size(); i++) {
		cv::Point center = last_cars->at(i).getCenter();
		float car_distance = sqrt((float)((center.x-road_line_intersection.x)*(center.x-road_line_intersection.x) + (center.y-road_line_intersection.y)*(center.y-road_line_intersection.y)));
		float chord_slope = (intersect_y - center.y)/(intersect_x - center.x);
		float chord_intercept = center.y - (chord_slope * center.x);
		float chord_x = ((size.height-1) - chord_intercept)/chord_slope;
		cv::Point chord_point(chord_x,size.height-1);
		float car_angle_bottom = atan((x_dist+(chord_x-bottom_x))/y_dist) - z;
		float car_angle_top = angle - car_angle_bottom;
		float distance_to_road_bottom = car_distance*tan(car_angle_bottom);
		float distance_to_road_top = car_distance*tan(car_angle_top);
		float roadwidth = distance_to_road_bottom + distance_to_road_top;
		cv::Rect box = last_cars->at(i).getBoundingBox();
		float car_length = sqrt((float)((box.width-box.x)*(box.width-box.x) + (box.height-box.y)*(box.height-box.y)));
		float car_length_adj = (road_width*car_length)/roadwidth;
		if (car_length_adj > threshold) {
		    last_cars->at(i).setType(traffic21::Vehicle::Car);
		} else {
		    last_cars->at(i).setType(traffic21::Vehicle::Truck);
		}
	    }
	}
    }
}
