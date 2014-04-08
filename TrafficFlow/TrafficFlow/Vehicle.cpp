#include "../include/Vehicle.hpp"

namespace traffic21
{
    Vehicle::Vehicle()
    {
	count = 0;
    }
    Vehicle::~Vehicle()
    {
    }
    cv::Rect Vehicle::getBoundingBox()
    {
	return boundingbox;
    }
    cv::Point Vehicle::getVelocity()
    {
	return velocity;
    }
    cv::Point Vehicle::getCenter()
    {
	return cv::Point(boundingbox.x + boundingbox.width/2,boundingbox.y + boundingbox.height/2);
    }
    void Vehicle::setBoundingBox(cv::Rect r)
    {
	boundingbox = r;
    }
    void Vehicle::setVelocity(cv::Point r)
    {
	velocity = r;
    }
    Vehicle::VehicleType Vehicle::getType()
    {
	if (count > 10) {
	    return Car;
	} else if (count < -10) {
	    return Truck;
	}
	return Unknown;
    }
    void Vehicle::setType(Vehicle::VehicleType v)
    {
	if (v == Car) {
	    count++;
	} else {
	    count--;
	}
    }
}
