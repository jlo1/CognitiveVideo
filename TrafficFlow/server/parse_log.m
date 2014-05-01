fileId = fopen('simple_log.txt');

data = textscan(fileId, '%f,%d,%d');
time = zeros(length(data{1}),1);
count = zeros(length(data{3}),1);
tmp = 1;
for n = 1:length(data{1}) 
   if (data{2}(n) ~= 555) 
       continue
   end
   
   time(tmp) = data{1}(n);
   count(tmp) = data{3}(n);
   tmp = tmp+1;
end

time = time(1:tmp-1);
count = count(1:tmp-1);


%hours = datenum(2014, 4, 30, ones(1,24));

time_edit = time(:)/1000/86400 + datenum(1970,1,1) - 4/24;
plot(time_edit, count);

L=get(gca,'XLim');
set(gca,'XTick',linspace(L(1),L(2),30));
datetick('x', 'HH:MM', 'keeplimits','keepticks');

rotateXLabels(gca(), 90);

axis tight
title('Traffic Statistics versus Time of Day');
xlabel('Time of day (24h format)');
ylabel('Number of cars appearing');

fclose(fileId);