#include <iostream>
#include <opencv2/opencv.hpp>
#include <opencv2/highgui/highgui.hpp>

using namespace cv;
using namespace std;

int main(int argc, char *argv[])
{
  Mat img = imread("/Users/jessicalo/Pictures/JL-03281S.jpg", CV_LOAD_IMAGE_UNCHANGED);
  if (img.empty()) {
    cout << "Error: Image cannot be loaded!" << endl;
    return -1;
  }
  
  namedWindow("Brain Image", CV_WINDOW_AUTOSIZE);
  imshow("Brain Image", img);
  
  waitKey(0);
  destroyWindow("Brain Image");
  
  return 0;
  
}