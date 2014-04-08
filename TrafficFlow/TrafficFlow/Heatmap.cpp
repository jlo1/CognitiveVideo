#include "../include/Heatmap.hpp"

namespace traffic21
{
    Heatmap::Heatmap()
    {
	count = 0;
	init = false;
    }
    Heatmap::~Heatmap()
    {
    }
    void Heatmap::update(cv::InputArray in, cv::OutputArray out)
    {
	count++;
	//float beta = 1.0/((float)count);
	cv::Mat image = in.getMat();
	out.create(image.size(), CV_32FC1);
	cv::Mat output = out.getMat();
	if (!init)
	{
	    init = true;
	    heatmap = cv::Mat(image.size(), CV_32FC1);
	}
	//cv::accumulateWeighted(image, heatmap,beta);
	cv::accumulate(image, heatmap);
	count++;
	cv::medianBlur(heatmap, output,3);
    }
    void Heatmap::getHeatmap(cv::OutputArray heatmap)
    {
	heatmap.create(heatmap.size(), CV_8U);
	cv::Mat hm = heatmap.getMat();
	hm.copyTo(hm);
    }
}
