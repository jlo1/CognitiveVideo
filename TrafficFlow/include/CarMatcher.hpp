#include "opencv2/core/core.hpp"
#include "opencv2/imgproc/imgproc.hpp"
#include "Vehicle.hpp"

#ifndef CARMATCHER_HPP
#define CARMATCHER_HPP
namespace traffic21
{
    class CarMatcher
    {
	public:
	CarMatcher();
	~CarMatcher();
	std::vector<Vehicle> match(std::vector<Vehicle> last_cars, std::vector<cv::Rect> new_cars);
    };
}
#endif
