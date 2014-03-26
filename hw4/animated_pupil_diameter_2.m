% 18799 K, HW 4 Part D
% 03/25/14
% Ranika Kejriwal (rkejriwa), Jessica Lo (jlo1), Preeti Singh (preetisi)

LEFTPUPILCOL = 4; 
GAZECOL_X = 11; 
GAZECOL_Y = 12;

dataroot = 'Assignment4-data/'; 
resultroot = 'hw4results/'; 
csvfilenames = ['data1-airport.csv'; 'data2-webpage.csv'; 'data3-mona.csv   '; 'data4-city.csv   '];
csvfiles = cellstr(csvfilenames);

for fileInd = 1 : size(csvfiles) 
    resultfilename = strcat(resultroot, 'partD_animated_pupil_diameter_0', num2str(fileInd), '.avi'); 
    vidObj = VideoWriter(resultfilename); 
    vidObj.FrameRate = 30; 
    vidObj.Quality = 100; 
    open(vidObj); 

    alldata = importdata(strcat(dataroot, csvfiles{fileInd})); 
    data = alldata.textdata; 
    dims = size(data);
    prior_time = 0;
    
    h = plot(2,2,'o','MarkerSize',1,'MarkerFaceColor','b');
    set(gcf, 'Renderer','OpenGL');
    for rowInd = 2 : dims(1)
        %Filter out useless data
        if (strcmp(data(rowInd, 2), 'false') || strcmp(data(rowInd, 3), 'false'))
            continue;
        end
        
        %gets the left pupil diameter from CSV file
        left_pupil = data(rowInd, LEFTPUPILCOL);
        %filters out the -1 values 
        if(strcmp(left_pupil, '-1.000'))
            continue; 
        end
        left = str2double(left_pupil{1}) * 10; 
        
        
        time = str2double(data(rowInd, 1));
        time_diff = 0;
        if (prior_time ~= 0) 
            time_diff = time - prior_time;
            title(csvfiles(fileInd),'FontSize',12);
            set(h,'MarkerSize', left);
            drawnow;
            frame = getframe;
            writeVideo(vidObj, frame.cdata);
            
            for timeInd = 2:30:time_diff
                writeVideo(vidObj, frame.cdata);
            end
        end
        prior_time = time;
        
    end

    close(vidObj);
    
end 
