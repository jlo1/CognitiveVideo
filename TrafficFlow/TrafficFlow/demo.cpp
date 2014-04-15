#include "opencv2/core/core.hpp"
#include "opencv2/highgui/highgui.hpp"
#include "../include/BackgroundSubtractorMedian.hpp"
#include "../include/Heatmap.hpp"
#include "../include/LineFitter.hpp"
#include "../include/CarDetector.hpp"
#include "../include/CarMatcher.hpp"
#include "../include/CarClassifier.hpp"
#include "../include/Vehicle.hpp"
#include <stdio.h>
#include <iostream>
#include <cmath>
#include <fstream>
#ifdef _WIN32
#include "opencv/highgui.h"
#endif

void drawCars(cv::Mat image, std::vector<traffic21::Vehicle> cars)
{
    std::vector<traffic21::Vehicle>::iterator itr;
    for (itr = cars.begin(); itr < cars.end(); ++itr)
    {
	traffic21::Vehicle car = (*itr);
	cv::Rect bb = car.getBoundingBox();
	traffic21::Vehicle::VehicleType t = car.getType();
	cv::Scalar color;
	if (t == traffic21::Vehicle::Truck) {
	    color = CV_RGB(0,255,0);
	} else if (t == traffic21::Vehicle::Car) {
	    color = CV_RGB(0,0,255);
	}
	if (color != cv::Scalar(0,0,0,0)) {
	    rectangle(image, bb.tl(), bb.br(), color, 1);
	}
    }
}

int main()
{
  /*fprintf( stderr, "cwd: %s\n", getenv("PWD") );
  std::ofstream outputFile;
  outputFile.open("data/program3data");
  outputFile << "Enter the first number: ";
  outputFile.close();
  */
  
#ifndef _WIN32
  cv::VideoCapture cap("/Users/jessicalo/Documents/Spring2014/18799 Cognitive Video/TrafficFlow/data/video/test.mp4");
  //cv::VideoCapture cap("data/video/test.mp4");
  if (!cap.isOpened())
  {
    std::cout << "didn't make it. sad lyfe." << std::endl;
    return -1;
  }
#else
  CvCapture *capture = cvCaptureFromAVI("data\\video\\test.mp4");
	if(!capture)
	{
    printf("!!! cvCaptureFromAVI failed (file not found?)\n");
		return -1;
	}
#endif
  traffic21::BackgroundSubtractorMedian back;
  traffic21::Heatmap hm;
  traffic21::LineFitter lf;
  traffic21::CarMatcher matcher;
  std::vector<traffic21::Vehicle> previous_cars;
  cv::Mat frame;
#ifndef _WIN32
  cap.read(frame);
#else
  frame = cv::Mat(cvQueryFrame(capture));
#endif
  traffic21::CarDetector cd(frame.size(), 350);
  traffic21::CarClassifier classifier(frame.size(),90.0,48.0);
  cv::namedWindow("out", CV_WINDOW_NORMAL);
  cv::Mat out;
  cv::Mat bigger(704, 480, frame.type());
  cv::Size outputsize(704,480);
  int x = 0;
  while (x < 250)
  {
#ifndef _WIN32
    cap.read(frame);
#else
    frame = cv::Mat(cvQueryFrame(capture));
#endif
    cv::Mat image = frame.clone();
    back(frame, out);
    x++;
  }
  x = 1;
  //bool first = true;
  while (1)
  {
#ifndef _WIN32
    cap.read(frame);
#else
    frame = cv::Mat(cvQueryFrame(capture));
#endif
    cv::Mat image = frame.clone();
    back(image, out); //takes an image, subtracts out a background
    std::vector<cv::Rect> rectangles = cd.detectCars(out);
    cv::Mat heatmap;
    hm.update(out,heatmap); //takes an image, averages to a heatmap
    cv::Mat g_gray;
    cv::erode(heatmap,heatmap,cv::Mat());
    cv::compare(heatmap,1, g_gray, cv::CMP_GE);
    cv::imshow("hm", g_gray);
    std::vector<cv::Mat> lines = lf.detectLines(g_gray);
    previous_cars = matcher.match(previous_cars,rectangles);
    if (lines.size() > 1) {
	    cv::Point first(lines[0].at<float>(2) - 200 * lines[0].at<float>(0), lines[0].at<float>(3) - 200 * lines[0].at<float>(1));
	    cv::Point second(lines[0].at<float>(2) + 200 * lines[0].at<float>(0), lines[0].at<float>(3) + 200 * lines[0].at<float>(1));
	    cv::line(image,first,second,CV_RGB(255,0,0), 2);
	    cv::Point first_2(lines[1].at<float>(2) - 200 * lines[1].at<float>(0), lines[1].at<float>(3) - 200 * lines[1].at<float>(1));
	    cv::Point second_2(lines[1].at<float>(2) + 200 * lines[1].at<float>(0), lines[1].at<float>(3) + 200 * lines[1].at<float>(1));
	    cv::line(image,first_2,second_2,CV_RGB(255,0,0), 2);
	    classifier.classify(&previous_cars, lines);
    }
    drawCars(image,previous_cars);
    cv::resize(image,bigger,outputsize);
    cv::imshow("out", bigger);
    int i = cv::waitKey(33);
    if (i != -1)
    {
	    std::cout << lines[0] << std::endl;
	    std::cout << lines[1] << std::endl;
	    break;
    }
  }
  return 1;
}
