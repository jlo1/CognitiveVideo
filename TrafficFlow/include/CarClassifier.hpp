#include "opencv2/core/core.hpp"
//#include "opencv2/imgproc/imgproc.hpp"
#include "Vehicle.hpp"

#ifndef CARCLASSIFIER_HPP
#define CARCLASSIFIER_HPP
namespace traffic21
{
    class CarClassifier
    {
	cv::Size size;
	float threshold;
	float road_width;
	public:
	CarClassifier(cv::Size, float, float);
	~CarClassifier();
	void classify(std::vector<Vehicle> *last_cars, std::vector<cv::Mat> road_lines);
    };
}
#endif
