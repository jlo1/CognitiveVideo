#include "opencv2/core/core.hpp"
#include "opencv2/imgproc/imgproc.hpp"
#include <iostream>
#ifdef _WIN32
#include "opencv/cv.h"
#endif

#ifndef LINEFITTER_HPP
#define LINEFITTER_HPP

namespace traffic21
{
    class LineFitter
    {
	public:
	LineFitter();
	~LineFitter();
	std::vector<cv::Mat> detectLines(cv::InputArray image);
    };
}
#endif
