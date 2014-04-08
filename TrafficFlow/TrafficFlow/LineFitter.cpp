#include "../include/LineFitter.hpp"

namespace traffic21
{
    LineFitter::LineFitter()
    {
    }
    LineFitter::~LineFitter()
    {
    }
    std::vector<cv::Mat> LineFitter::detectLines(cv::InputArray image)
    {
	std::vector<cv::Mat> lines;
#ifndef _WIN32
	std::vector<std::vector<cv::Point> > v;
	cv::Mat input = image.getMat();
	cv::findContours(input, v, CV_RETR_LIST,CV_CHAIN_APPROX_NONE);
	std::vector<std::vector<cv::Point> >::iterator itr;
	for (itr = v.begin(); itr < v.end(); ++itr) {
	    cv::Mat m((*itr));
#else
	    IplImage* img = &IplImage(image.getMat());
	    CvMemStorage* storage = cvCreateMemStorage(0);
	    CvSeq* contours = 0;
	    int numCont = 0;
	    numCont = cvFindContours(img,storage,&contours,sizeof(CvContour),CV_RETR_EXTERNAL,CV_CHAIN_APPROX_SIMPLE,cvPoint(0,0));
	    for (CvSeq* c = contours; c != NULL; c=c->h_next) {
		cv::Mat m((int)c->total,1,CV_32SC2);
		cvCvtSeqToArray(c,m.data);
#endif
		if (cv::contourArea(m) < 10000)
		    continue;
		cv::Mat hull;
		cv::convexHull(cv::Mat(m),hull, true,1);
		cv::Mat line;
		cv::fitLine(hull,line,CV_DIST_L2,0,0.01,0.01);
		std::vector<cv::Point> above;
		std::vector<cv::Point> below;
		for(int i = 0; i < hull.rows; i++)
		{
		    const int* Mi = hull.ptr<int>(i);
		    int x = Mi[0];
		    int y = Mi[1];
		    float diffx = x - line.at<float>(2);
		    float factor = diffx / line.at<float>(0);
		    float yonline = line.at<float>(3) + factor * line.at<float>(1);
		    if (y > yonline) {
			above.push_back(cv::Point(x,y));
		    } else {
			below.push_back(cv::Point(x,y));
		    }
		}
		if (above.size() > 0) {
		    cv::Mat above_line;
		    cv::fitLine(cv::Mat(above),above_line,CV_DIST_L2,0,0.01,0.01);
		    lines.push_back(above_line);
		}
		if (below.size() > 0) {
		    cv::Mat below_line;
		    cv::fitLine(cv::Mat(below),below_line,CV_DIST_L2,0,0.01,0.01);
		    lines.push_back(below_line);
		}
	    }
	    return lines;
	}
    }
