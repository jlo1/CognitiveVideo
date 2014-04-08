#include "opencv2/core/core.hpp"
#include "opencv2/imgproc/imgproc.hpp"
#ifdef _WIN32
#include "opencv/cv.h"
#endif

#ifndef CARDETECTOR_HPP
#define CARDETECTOR_HPP
namespace traffic21
{
    class CarDetector
    {
	cv::Size dimensions;
	int size_threshold;
	public:
	CarDetector(cv::Size image_dimensions, int min_size);
	~CarDetector();
	std::vector<cv::Rect> detectCars(cv::InputArray image);
    };
}
#endif
