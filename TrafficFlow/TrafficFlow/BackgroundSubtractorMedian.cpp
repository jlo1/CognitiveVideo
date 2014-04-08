#include "../include/BackgroundSubtractorMedian.hpp"

namespace traffic21
{
    BackgroundSubtractorMedian::BackgroundSubtractorMedian()
    {
	fg_threshold = 30;
	median_filter_level = 5;
	init = false;
    }
    BackgroundSubtractorMedian::BackgroundSubtractorMedian(const char* name)
    {
	fg_threshold = 30;
	median_filter_level = 5;
	init = true;
	bgmodel = cv::imread(name,0);
    }
    BackgroundSubtractorMedian::~BackgroundSubtractorMedian()
    {
    }
    void BackgroundSubtractorMedian::operator()(cv::InputArray _image, cv::OutputArray _fgmask, double learningRate)
    {
	framecount++;
	cv::Mat image = _image.getMat();
	if (image.channels() > 1) {
	    cvtColor(image,image,CV_BGR2GRAY);
	}
	if (image.cols == 0 || image.rows == 0) {
	    return;
	}
	_fgmask.create(image.size(), CV_8U);
	cv::Mat fgmask = _fgmask.getMat();
	if (!init)
	{
	    init = true;
	    bgmodel = cv::Mat(image.size(), CV_8U);
	}
	//printf("(%d,%d)(%d) ",image.cols,image.rows,image.type());
	//printf("(%d,%d)(%d)\n",bgmodel.cols,bgmodel.rows,bgmodel.type());

	cv::Mat cmpArr = cv::Mat(image.size(),CV_8U);
	cv::compare(image, bgmodel, cmpArr, CV_CMP_GT);
	cv::bitwise_and(cmpArr, 1, cmpArr);
	cv::add(bgmodel, cmpArr, bgmodel);

	cmpArr = cv::Mat(image.size(),CV_8U);
	cv::compare(image, bgmodel, cmpArr, CV_CMP_LT);
	cv::bitwise_and(cmpArr, 1, cmpArr);
	cv::subtract(bgmodel, cmpArr, bgmodel);

	cv::absdiff(image, bgmodel,fgmask);
	cv::threshold(fgmask,fgmask,fg_threshold,255,CV_THRESH_TOZERO);
	cv::medianBlur(fgmask,fgmask,median_filter_level);
    }
    void BackgroundSubtractorMedian::getBackgroundImage(cv::OutputArray backgroundImage) const
    {
	backgroundImage.create(bgmodel.size(),CV_8U);
	cv::Mat bg = backgroundImage.getMat();
	bgmodel.copyTo(bg);
    }
}
