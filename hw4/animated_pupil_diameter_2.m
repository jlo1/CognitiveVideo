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
resultfilename = strcat(resultroot, 'partD_animated_pupil_diameter.avi'); 
vidObj = VideoWriter(resultfilename); 
vidObj.FrameRate = 5; 
vidObj.Quality = 100; 
open(vidObj); 

for fileInd = 1 : size(csvfiles) 
    alldata = importdata(strcat(dataroot, csvfiles{fileInd})); 
    data = alldata.textdata; 
    dims = size(data); 
    
    diameters = zeros(dims(1),1); 
    counter = 0; 
    
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
        left = str2double(left_pupil{1}); 
        counter = counter + 1; 
        diameters(counter) = left; 
    end
    
    frame = figure(1);
    set(gcf, 'Renderer','OpenGL');       
    diameters = diameters * 10; 
    h = plot(2,2,'o','MarkerSize',diameters(1),'MarkerFaceColor','b');
    for i=2:counter 
        writeVideo(vidObj, frame); 
        title(csvfiles(fileInd),'FontSize',12);
        set(h,'MarkerSize', diameters(i)); 
        pause(.1); 
        drawnow; 
    end 
    
end 

close(vidObj);
