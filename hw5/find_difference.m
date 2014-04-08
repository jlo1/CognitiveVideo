numImages = 3;
numIterations = 20;

for i = 1:numImages
    % Open the video
    outputVideo = VideoWriter(strcat('result', num2str(i), '.avi'));
    outputVideo.FrameRate = 15;
    open(outputVideo);
    
    % Load the 2 images to be inspected
    imgA = imread(strcat('images/image', num2str(i), 'a.png'));
    imgB = imread(strcat('images/image', num2str(i), 'b.png'));
    
    % Write the images to the video file multiple times
    for j = 1:numIterations
        writeVideo(outputVideo,imgA);
        writeVideo(outputVideo,imgB);
    end
    
    %Close the video
    close(outputVideo);
end