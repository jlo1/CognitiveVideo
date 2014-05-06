clear;

fileId = fopen('simple_log.txt');
time_of_data = '(Saturday May 3rd 10pm - Sunday May 4th 2pm)';

data = textscan(fileId, '%f,%d,%d');
time = zeros(length(data{1}),1);
count = zeros(length(data{3}),1);
tmp = 1;

start_ml_time = datenum(2014, 5, 3, 22, 0, 0) + 4/24;
start_ep_time = 86400000* (start_ml_time - datenum(1970,1,1));

end_ml_time = datenum(2014, 5, 4, 14, 0, 0) + 4/24;
end_ep_time = 86400000* (end_ml_time - datenum(1970,1,1));

for n = 1:length(data{1})
    if (data{1}(n) > end_ep_time)
        continue;
    end
    if (data{1}(n) < start_ep_time || data{2}(n) ~= 555)
        continue;
    end
   
    time(tmp) = data{1}(n);
    count(tmp) = data{3}(n);
    tmp = tmp+1;
end

time = time(1:tmp-1);
count = count(1:tmp-1);

time_edit = time(:)/1000/86400 + datenum(1970,1,1) - 4/24;
plot(time_edit, count);

%Use time as the x-axis label
L=get(gca,'XLim');
set(gca,'XTick',linspace(L(1),L(2),30));
datetick('x', 'HH:MM', 'keeplimits','keepticks');

rotateXLabels(gca(), 90);

axis tight
ylim([0 30]);
title(strcat('Traffic Statistics versus Time of Day - ', time_of_data));
xlabel('Time of day (24h format)');
ylabel('Number of cars appearing on the road');

fclose(fileId);