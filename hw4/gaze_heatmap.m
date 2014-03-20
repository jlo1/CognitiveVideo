% 18799 K, HW 4 Part B
% 03/25/14
% Ranika Kejriwal (rkejriwa), Jessica Lo (jlo1), Preeti Singh (preetisi)

ROW_RES = 1680;
COL_RES = 1050;
GAZECOL_X = 11;
GAZECOL_Y = 12;

dataroot = 'Assignment4-data/';
resultroot = 'hw4results/';
csvfilenames = ['data1-airport.csv'; 'data2-webpage.csv'; 'data3-mona.csv   '; 'data4-city.csv   '];
csvfiles = cellstr(csvfilenames);
imgfilenames = ['img1.png'; 'img2.png'; 'img3.png'; 'img4.png'];
imgfiles = cellstr(imgfilenames);

for fileInd= 1 : size(csvfiles)
    alldata = importdata(strcat(dataroot, csvfiles{fileInd}));
    data = alldata.textdata;
    dims = size(data);
    img = imread(strcat(dataroot, imgfiles{fileInd}));
    imshow(img);
    hold on;
    x = zeros(dims(1));
    y = zeros(dims(1));
    counter = 0;
    for rowInd = 2 : dims(1) 
        %Filter out useless data
        if (strcmp(data(rowInd, 2), 'false') || strcmp(data(rowInd, 3), 'false'))
            continue;
        end
        
        %Keep useful saccadic gaze points
        cell_ptx = data(rowInd, GAZECOL_X);
        cell_pty = data(rowInd, GAZECOL_Y);
        ptx = str2double(cell_ptx{1});
        pty = str2double(cell_pty{1});
        
        counter = counter + 1;
        x(counter) = ptx;
        y(counter) = pty;
        plot(ptx, pty, 'ro');
        hold on;
        
    end
    
    %Plot useful points
    x = x(1:counter);
    y = y(1:counter);
    plot(x, y);
    
    frame = getframe;
    imwrite(frame.cdata, strcat(resultroot, 'partA_img', num2str(fileInd), '.png'));
end