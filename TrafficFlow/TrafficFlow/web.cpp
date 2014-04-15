#include "opencv2/core/core.hpp"
#include "opencv2/highgui/highgui.hpp"
#include "../include/BackgroundSubtractorMedian.hpp"
#include "../include/Heatmap.hpp"
#include "../include/LineFitter.hpp"
#include "../include/CarDetector.hpp"
#include "../include/CarMatcher.hpp"
#include "../include/Vehicle.hpp"
#include <stdlib.h>
#include <cstring>
#include <string>
#include <iostream>
#include <fstream>
#include "time.h"
#include <curl/curl.h>

static std::vector<int> cameras;
static std::vector<traffic21::BackgroundSubtractorMedian> subs;

struct PixMem {
    char* mem;
    size_t size;
};
static size_t MemCb(void *contents, size_t size, size_t	nmemb, void *mystuff)
{
    size_t real_size = size * nmemb;
    struct PixMem *mem = (struct PixMem*)mystuff;
    mem->mem = (char*)realloc(mem->mem,mem->size + real_size + 1);
    memcpy(&(mem->mem[mem->size]),contents,real_size);
    mem->size += real_size;
    mem->mem[mem->size] = 0;
    return real_size;
}
struct PixMem* download_url(const char* url)
{
    // Set up Curl, based on http://curl.haxx.se/libcurl/c/getinmemory.html
    // Gotta free the memory of the matrix returned
    struct PixMem* mem = (struct PixMem*)calloc(sizeof(struct PixMem),1);
    CURL *curl;
    mem->mem = (char*)malloc(1);
    mem->size = 0;
    curl = curl_easy_init();
    curl_easy_setopt(curl,CURLOPT_URL,url);
    curl_easy_setopt(curl,CURLOPT_WRITEFUNCTION, MemCb);
    curl_easy_setopt(curl,CURLOPT_WRITEDATA,(void*)(mem));
    curl_easy_setopt(curl,CURLOPT_USERAGENT,"libcurl-agent/1.0");
    curl_easy_perform(curl);
    curl_easy_cleanup(curl);
    return mem;
}
int web_main(int argc, char* argv[])
{
  //read list of cameras
  curl_global_init(CURL_GLOBAL_ALL);
  std::ifstream config;
  config.open("/Users/jessicalo/Documents/Spring2014/18799 Cognitive Video/TrafficFlow/data/camera_ids.txt");
  //config.open("data/camera_ids.txt");
  char number[5];
  config.getline(number,5);
  int count = atoi(number);
  for (int i = 0; i < count; i++) {
    config.getline(number,5);
    int id = atoi(number);
    cameras.push_back(id);
    subs.push_back(traffic21::BackgroundSubtractorMedian());
  }
  cv::Mat f;
  traffic21::CarDetector cd(cv::Size(352,240), 80);
  cv::Mat fg;
  long t = 0;
  for (;;) {
    t = time(NULL);
    //std::cout << cameras.size() << std::endl;
    for (unsigned int i = 0; i < cameras.size(); i++) {
      std::cout << cameras[i] << std::endl;
      std::stringstream out;
      out << "http://www.dot35.state.pa.us/public/Districts/District11/WebCams/D11-";
      out << cameras[i];
      out << ".jpg?v=";
      out << (time(NULL) * 1000);
      std::cout << "Downloading: " << cameras[i] << std::endl;
      struct PixMem* mem = download_url(out.str().data());
      std::cout << "Done Downloading: " << cameras[i] << std::endl;
      cv::Mat img = cv::Mat(cv::Size(352,240),CV_8U,mem->mem);
      cv::Mat m = cv::imdecode(img,1);
      if (m.cols == 0 || m.rows == 0)
        continue;
      subs[i](m, fg);
      std::cout << cameras[i] << ",";
      cv::Mat contour = fg.clone();
      cv::threshold(contour,contour,5.0,255,CV_THRESH_BINARY);
      std::vector<cv::Rect> rectangles = cd.detectCars(contour);
      std::cout << rectangles.size() << std::endl;
      if (mem->mem != NULL)
        free(mem->mem);
      if (mem != NULL)
        free(mem);
      
    }
    //std::cout << "-" << std::endl;
    cv::waitKey(5);
  }
  curl_global_cleanup();
}
