keys = [2;4;6;8;10;12;14;16;18;20;22;24;26;28];
values = [83.8; 94.7; 91.3; 98.1; 96.6; 95.2; 97.9; 101.9; 104.5; 108; 113.3; 116.2; 111.9; 110];
scatter(keys, values);
axis([0 100 0 250]);
xlabel('Number of cameras');
ylabel('Time to start program (ms)');
title('Number of Cameras Affecting Time to Load');

hold on;

plot([2 100], [83.8 215.6]);