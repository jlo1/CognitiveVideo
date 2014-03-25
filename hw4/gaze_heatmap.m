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
    
    img_dim = size(img);
    heatmap_data = zeros(img_dim(1), img_dim(2));
    counter = 0;
    prior_time = 0;
    for rowInd = 2 : dims(1) 
        %Filter out useless data
        if (strcmp(data(rowInd, 2), 'false') || strcmp(data(rowInd, 3), 'false'))
            continue;
        end
        counter = counter + 1;
        
        %Keep useful saccadic gaze points
        cell_ptx = data(rowInd, GAZECOL_X);
        cell_pty = data(rowInd, GAZECOL_Y);
        ptx = str2double(cell_ptx{1});
        pty = str2double(cell_pty{1});
        
        
        time = str2double(data(rowInd, 1));
        time_diff = 0;
        if (prior_time ~= 0) 
            time_diff = time - prior_time;
            for boxIndR=-25:25
                if pty + boxIndR <= 0
                    boxIndR = 0;
                end
                if boxIndR + pty > img_dim(2)
                    break;
                end
                for boxIndC=-25:25
                    if ptx + boxIndC <= 0
                        boxIndC = 0;
                    end
                    if boxIndC + ptx > img_dim(1)
                        break;
                    end
                    heatmap_data(pty + boxIndR, ptx + boxIndC) = heatmap_data(pty+boxIndR, ptx+boxIndC) + time_diff;
                end
                
            end
        end
        prior_time = time;
        
    end
    
    colormap('jet');
    imagesc(heatmap_data);
    colorbar;
    
    frame = getframe;
    imwrite(frame.cdata, strcat(resultroot, 'partB_img', num2str(fileInd), '.png'));
end