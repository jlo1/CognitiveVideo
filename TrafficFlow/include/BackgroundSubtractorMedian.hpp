#include "opencv2/core/core.hpp"
#include "opencv2/imgproc/imgproc.hpp"
#include "opencv2/video/video.hpp"
#include "opencv2/highgui/highgui.hpp"
#include <iostream>

#ifndef BACKGROUNDSUBTRACTORMEDIAN_HPP
#define BACKGROUNDSUBTRACTORMEDIAN_HPP
namespace traffic21
{
    class BackgroundSubtractorMedian : public cv::BackgroundSubtractor
    {
	int fg_threshold;
	int median_filter_level;
	bool init;
	int framecount;
	cv::Mat bgmodel;
	public:
	BackgroundSubtractorMedian();
	BackgroundSubtractorMedian(const char* bg);
	~BackgroundSubtractorMedian();
	virtual void operator()(cv::InputArray image, cv::OutputArray fgmask, double learningRate=0);
	virtual void getBackgroundImage(cv::OutputArray backgroundImage) const;

    };
}
#endif
