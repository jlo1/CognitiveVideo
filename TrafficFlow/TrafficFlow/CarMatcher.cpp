#include "../include/CarMatcher.hpp"
#include <stdio.h>
#include <iostream>

namespace traffic21
{
    CarMatcher::CarMatcher()
    {
    }
    CarMatcher::~CarMatcher()
    {
    }
    std::vector<Vehicle> CarMatcher::match(std::vector<Vehicle> last_cars, std::vector<cv::Rect> new_cars)
    {
	std::vector<Vehicle> ret;
	std::vector<cv::Rect>::iterator boxes;
	for (boxes = new_cars.begin(); boxes < new_cars.end(); ++boxes) {
	    int tot_index = 0;
	    double tot_dist = DBL_MAX;
	    cv::Rect old_bb = (*boxes);
	    for (unsigned int i = 0; i < last_cars.size(); ++i) {
		cv::Rect new_bb = last_cars[i].getBoundingBox();
		double dist = (new_bb.x - old_bb.x)*(new_bb.x - old_bb.x) + (new_bb.y - old_bb.y)*(new_bb.y - old_bb.y);
		if (dist < tot_dist)
		{
		    tot_dist = dist;
		    tot_index = i;
		}
	    }
	    if (tot_dist > 75.0) {
		Vehicle c;
		c.setBoundingBox(old_bb);
		c.setVelocity(cv::Point(0,0));
		ret.push_back(c);
	    } else {
		Vehicle c = last_cars[tot_index];
		c.setBoundingBox(old_bb);
		ret.push_back(c);
	    }
	}
	return ret;
    }
}
