#include "../include/CarDetector.hpp"

namespace traffic21
{
    CarDetector::CarDetector(cv::Size image_dimensions, int min_size)
    {
	dimensions = image_dimensions;
	size_threshold = min_size;
    }
    CarDetector::~CarDetector()
    {
    }
    std::vector<cv::Rect> CarDetector::detectCars(cv::InputArray input)
    {
	std::vector<cv::Rect> cars;
#ifndef _WIN32
	//bad... windows c++ findContours is borked
	//also sould consolidate common code here
	std::vector<std::vector<cv::Point> > v;
	cv::Mat image = input.getMat().clone();
	cv::findContours(image, v, CV_RETR_EXTERNAL,CV_CHAIN_APPROX_NONE);
	std::vector<std::vector<cv::Point> >::iterator itr;
	for (itr = v.begin(); itr < v.end(); ++itr) {
	    cv::Rect bb = cv::boundingRect(cv::Mat((*itr)));
#else
	    IplImage* img = &IplImage(input.getMat());
	    CvMemStorage* storage = cvCreateMemStorage(0);
	    CvSeq* contours = 0;
	    int numCont = 0;
	    numCont = cvFindContours(img,storage,&contours,sizeof(CvContour),CV_RETR_EXTERNAL,CV_CHAIN_APPROX_SIMPLE,cvPoint(0,0));
	    for (CvSeq* c = contours; c != NULL; c=c->h_next) {
		cv::Mat m((int)c->total,1,CV_32SC2);
		cvCvtSeqToArray(c,m.data);
		cv::Rect bb = cv::boundingRect(m);
#endif
		if (bb.area() < size_threshold)
		    continue;
		if (bb.x + bb.width >= (dimensions.width - 1) || bb.y + bb.height >= (dimensions.height - 1))
		{
		    continue;
		}
		cars.push_back(bb);
	    }
	    return cars;
	}
    }
