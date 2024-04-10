Hello everyone, my name’s Youjiang, I’m the Edge AI application engineer at Seeed Studio. It’s my pleasure to be here with you to discover the potential of the Jetson Orin and YOLOv8, within the retail market. For this live demo, I'll show you how to use Ultralytics YOLOv8 to implement queue management and deploy the application on our reComputer Jetson Orin NX edge device.

So now, let's execute the python script to see what happens. All of the inferencing parts take place on the Jetson device.

(播放demo最终生成的视频)

In fact, I only spent four hours doing this. It took me three hours to find the input video, and I just spent one hour to setup Jetson runtime environment and modifying the test code. This means that both Jetson and Ultralytics are very user-friendly.

Doing such a demo roughly requires three steps.

1、First of all, setting up the Yolov8 running environment on Jetson. It has become a very simple task. Users can refer to ultralytics documents or seeed documents to install Ultralytics very easily.

2、Next is writing the application. Here, we can also refer to the Ultralytics official documentation to design our own program. For ease of demonstration, we directly copy the example code from the documentation and modify the relevant parameters, such as the path of the input file, queuing region, etc.

3、Finally, run the script of this application using the Python interpreter. 

Let's check the python code.

```sh
# import some dependencies at the beginning.

import cv2
from ultralytics import YOLO
from ultralytics.solutions import queue_management


# Load the YOLO model, here you can choose which model to use.
model = YOLO("yolov8n.pt")

# Select the path of the input video. It can also be an IP camera, USB camera, and so on.
cap = cv2.VideoCapture("/home/seeed/queue.mp4")

# Check if the input video stream starts normally. if abnormally , the program will automatically exit.
assert cap.isOpened(), "Error reading video file"

# Create a new video file to save the inference results.
w, h, fps = (int(cap.get(x)) for x in (cv2.CAP_PROP_FRAME_WIDTH, cv2.CAP_PROP_FRAME_HEIGHT, cv2.CAP_PROP_FPS))
video_writer = cv2.VideoWriter("queue_management.avi", cv2.VideoWriter_fourcc(*'mp4v'), fps, (int(w*0.5), int(h*0.5)))

# Define the queuing region. This is very interesting. 
# I have an input video, but I don't know how to determine the coordinates of each point. 
# Therefore, I use OpenCV to open a frame of the input video,
# and then determine each point in the OpenCV window.

Let me show you how to do it. 
(添加这行代码并运行 cv2.waitKey(0) 屏幕上将会出现一个新的窗口，在新窗口中移动鼠标将会实时显示鼠标的坐标)
When I move the mouse in this window, the bottom right corner will display the coordinates of the mouse in the image in real-time. Then, I just need to record the points I need.

queue_region = [(380, 30), (940, 30), (940, 510), (380, 510)]

# Initialize the queue management object.
queue = queue_management.QueueManager()
queue.set_args(classes_names=model.names, reg_pts=queue_region, line_thickness=3, fontsize=1.0, region_color=(255, 144, 31))

# Retrieve and process each frame from the video file.
while cap.isOpened():
    success, im0 = cap.read()
    if success:
# resize the input frame
        im0 = cv2.resize(im0, (0, 0), fx=0.5, fy=0.5)
# Invoke the YOLOv8 model to track the person object.
        tracks = model.track(im0, show=False, persist=True, verbose=False, classes=0)
# Invoke the queue management method provided by Ultralytics.
        out = queue.process_queue(im0, tracks)
# save the result
        video_writer.write(im0)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
        continue
    print("Video frame is empty or video processing has been successfully completed.")
    break
#  close video and window
cap.release()
cv2.destroyAllWindows()
```

However, the final output of these current application is edited video, which is intended for human checking, it can not provide direct information to machines or other applications. So, I've customized a new class that base on ultralytics to direct output people flow information. Let's run this script to try it out.

(运行第二个脚本)

You can see that the number of object in the defined region is shown in real time in the terminal.

In fact, ultralytics can do much more than that. We can also use it to generate density maps to help retail stores plan store space in a better way.
So I'm going to show you this demo of a heat map.

（运行第三个脚本）

We can clearly see the distribution density of customers in each region during a certain period of time.


That is all of the live demo presentation. Thank you very much.

