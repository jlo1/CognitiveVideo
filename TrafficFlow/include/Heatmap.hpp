#include "opencv2/core/core.hpp"
#include "opencv2/imgproc/imgproc.hpp"
#include "opencv2/highgui/highgui.hpp"

#ifndef HEATMAP_HPP
#define HEATMAP_HPP

namespace traffic21
{
    class Heatmap
    {
	int count;
	bool init;
	cv::Mat heatmap;
	public:
	Heatmap();
	~Heatmap();
	void update(cv::InputArray image, cv::OutputArray heatmap);
	void getHeatmap(cv::OutputArray out);
    };
}
#endif
