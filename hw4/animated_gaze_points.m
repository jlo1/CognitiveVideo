% 18799 K, HW 4 Part C
% 03/25/14
% Ranika Kejriwal (rkejriwa), Jessica Lo (jlo1), Preeti Singh (preetisi)

%For no resizing, set to 1.
RESIZE_FACTOR = 10;
COL_RES = 1680;
ROW_RES = 1050;
GAZECOL_X = 11;
GAZECOL_Y = 12;
VID_SIZE_WID = COL_RES/RESIZE_FACTOR;
VID_SIZE_HGT = ROW_RES/RESIZE_FACTOR;

dataroot = 'Assignment4-data/';
resultroot = 'hw4results/';
csvfilenames = ['data1-airport.csv'; 'data2-webpage.csv'; 'data3-mona.csv   '; 'data4-city.csv   '];
csvfiles = cellstr(csvfilenames);
imgfilenames = ['img1.png'; 'img2.png'; 'img3.png'; 'img4.png'];
imgfiles = cellstr(imgfilenames);

ptx = 0;
pty = 0;

for fileInd= 1 : size(csvfiles)
    
    resultfilename = strcat(resultroot, 'partC_animated_gaze_0', num2str(fileInd), '.avi');
    vidObj = VideoWriter(resultfilename);
    vidObj.FrameRate = 50;
    vidObj.Quality = 100;
    open(vidObj);

    alldata = importdata(strcat(dataroot, csvfiles{fileInd}));
    data = alldata.textdata;
    dims = size(data);
    img = imread(strcat(dataroot, imgfiles{fileInd}));
    img = imresize(img, [VID_SIZE_HGT VID_SIZE_WID]);
    
    imshow(img);
    hold on;
    x = zeros(dims(1));
    y = zeros(dims(1));
    counter = 0;
    prior_time = 0;
    
    for rowInd = 2 : dims(1) 
        %Filter out useless data
        if (strcmp(data(rowInd, 2), 'false') || strcmp(data(rowInd, 3), 'false'))
            continue;
        end
        
        time = str2double(data(rowInd, 1));
        time_diff = 0;
        if (prior_time ~= 0) 
            time_diff = time - prior_time;
            framedata = getframe;
            frame = imresize(framedata.cdata, [VID_SIZE_HGT VID_SIZE_WID]);
            writeVideo(vidObj, frame);
            
            for timeInd = 2:30:time_diff
                writeVideo(vidObj, frame);
            end
        end
        prior_time = time;
        prior_ptx = ptx;
        prior_pty = pty;
        
        %Keep useful saccadic gaze points
        cell_ptx = data(rowInd, GAZECOL_X);
        cell_pty = data(rowInd, GAZECOL_Y);
        ptx = str2double(cell_ptx{1})/RESIZE_FACTOR;
        pty = str2double(cell_pty{1})/RESIZE_FACTOR;
        
        counter = counter + 1;
        x(counter) = ptx;
        y(counter) = pty;
        plot(ptx, pty, 'ro');
        hold on;
        
        %Plot lines
        if counter > 1
            line([prior_ptx ptx], [prior_pty pty]);
            hold on;
        end
        
    end
    
    close(vidObj);
end