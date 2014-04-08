#include "opencv2/core/core.hpp"
#include <iostream>

#ifndef VEHICLE_HPP
#define VEHICLE_HPP
namespace traffic21
{
    class Vehicle
    {
	cv::Rect boundingbox;
	cv::Point velocity;
	cv::Point center;
	int count;
	public:
	    Vehicle();
	    ~Vehicle();
	    enum VehicleType { Car, Truck, Unknown};
	    cv::Rect getBoundingBox();
	    void setBoundingBox(cv::Rect r);
	    cv::Point getVelocity();
	    void setVelocity(cv::Point r);
	    cv::Point getCenter();
	    VehicleType getType();
	    void setType(VehicleType v);
    };
}
#endif
