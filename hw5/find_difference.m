numImages = 3;
numIterations = 20;

for i = 1:numImages
    outputVideo = VideoWriter(strcat('result', num2str(i), '.avi'));
    outputVideo.FrameRate = 15;
    open(outputVideo);

    imgA = imread(strcat('images/image', num2str(i), 'a.png'));
    imgB = imread(strcat('images/image', num2str(i), 'b.png'));
    for j = 1:numIterations
        writeVideo(outputVideo,imgA);
        writeVideo(outputVideo,imgB);
    end
    close(outputVideo);
end