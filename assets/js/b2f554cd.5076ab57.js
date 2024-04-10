"use strict";(self.webpackChunkyoujiang_site=self.webpackChunkyoujiang_site||[]).push([[894],{6042:e=>{e.exports=JSON.parse('{"blogPosts":[{"id":"/yolo-live-demo","metadata":{"permalink":"/blog/yolo-live-demo","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/yolo-live-demo.md","source":"@site/blog/yolo-live-demo.md","title":"yolo-live-demo","description":"Hello everyone, my name\u2019s Youjiang, I\u2019m the Edge AI application engineer at Seeed Studio. It\u2019s my pleasure to be here with you to discover the potential of the Jetson Orin and YOLOv8, within the retail market. For this live demo, I\'ll show you how to use Ultralytics YOLOv8 to implement queue management and deploy the application on our reComputer Jetson Orin NX edge device.","date":"2024-04-10T13:21:31.048Z","formattedDate":"April 10, 2024","tags":[],"readingTime":3.85,"hasTruncateMarker":false,"authors":[],"frontMatter":{},"unlisted":false,"nextItem":{"title":"Update Site","permalink":"/blog/person-info/update-site"}},"content":"Hello everyone, my name\u2019s Youjiang, I\u2019m the Edge AI application engineer at Seeed Studio. It\u2019s my pleasure to be here with you to discover the potential of the Jetson Orin and YOLOv8, within the retail market. For this live demo, I\'ll show you how to use Ultralytics YOLOv8 to implement queue management and deploy the application on our reComputer Jetson Orin NX edge device.\\r\\n\\r\\nSo now, let\'s execute the python script to see what happens. All of the inferencing parts take place on the Jetson device.\\r\\n\\r\\n(\u64ad\u653edemo\u6700\u7ec8\u751f\u6210\u7684\u89c6\u9891)\\r\\n\\r\\nIn fact, I only spent four hours doing this. It took me three hours to find the input video, and I just spent one hour to setup Jetson runtime environment and modifying the test code. This means that both Jetson and Ultralytics are very user-friendly.\\r\\n\\r\\nDoing such a demo roughly requires three steps.\\r\\n\\r\\n1\u3001First of all, setting up the Yolov8 running environment on Jetson. It has become a very simple task. Users can refer to ultralytics documents or seeed documents to install Ultralytics very easily.\\r\\n\\r\\n2\u3001Next is writing the application. Here, we can also refer to the Ultralytics official documentation to design our own program. For ease of demonstration, we directly copy the example code from the documentation and modify the relevant parameters, such as the path of the input file, queuing region, etc.\\r\\n\\r\\n3\u3001Finally, run the script of this application using the Python interpreter. \\r\\n\\r\\nLet\'s check the python code.\\r\\n\\r\\n```sh\\r\\n# import some dependencies at the beginning.\\r\\n\\r\\nimport cv2\\r\\nfrom ultralytics import YOLO\\r\\nfrom ultralytics.solutions import queue_management\\r\\n\\r\\n\\r\\n# Load the YOLO model, here you can choose which model to use.\\r\\nmodel = YOLO(\\"yolov8n.pt\\")\\r\\n\\r\\n# Select the path of the input video. It can also be an IP camera, USB camera, and so on.\\r\\ncap = cv2.VideoCapture(\\"/home/seeed/queue.mp4\\")\\r\\n\\r\\n# Check if the input video stream starts normally. if abnormally , the program will automatically exit.\\r\\nassert cap.isOpened(), \\"Error reading video file\\"\\r\\n\\r\\n# Create a new video file to save the inference results.\\r\\nw, h, fps = (int(cap.get(x)) for x in (cv2.CAP_PROP_FRAME_WIDTH, cv2.CAP_PROP_FRAME_HEIGHT, cv2.CAP_PROP_FPS))\\r\\nvideo_writer = cv2.VideoWriter(\\"queue_management.avi\\", cv2.VideoWriter_fourcc(*\'mp4v\'), fps, (int(w*0.5), int(h*0.5)))\\r\\n\\r\\n# Define the queuing region. This is very interesting. \\r\\n# I have an input video, but I don\'t know how to determine the coordinates of each point. \\r\\n# Therefore, I use OpenCV to open a frame of the input video,\\r\\n# and then determine each point in the OpenCV window.\\r\\n\\r\\nLet me show you how to do it. \\r\\n(\u6dfb\u52a0\u8fd9\u884c\u4ee3\u7801\u5e76\u8fd0\u884c cv2.waitKey(0) \u5c4f\u5e55\u4e0a\u5c06\u4f1a\u51fa\u73b0\u4e00\u4e2a\u65b0\u7684\u7a97\u53e3\uff0c\u5728\u65b0\u7a97\u53e3\u4e2d\u79fb\u52a8\u9f20\u6807\u5c06\u4f1a\u5b9e\u65f6\u663e\u793a\u9f20\u6807\u7684\u5750\u6807)\\r\\nWhen I move the mouse in this window, the bottom right corner will display the coordinates of the mouse in the image in real-time. Then, I just need to record the points I need.\\r\\n\\r\\nqueue_region = [(380, 30), (940, 30), (940, 510), (380, 510)]\\r\\n\\r\\n# Initialize the queue management object.\\r\\nqueue = queue_management.QueueManager()\\r\\nqueue.set_args(classes_names=model.names, reg_pts=queue_region, line_thickness=3, fontsize=1.0, region_color=(255, 144, 31))\\r\\n\\r\\n# Retrieve and process each frame from the video file.\\r\\nwhile cap.isOpened():\\r\\n    success, im0 = cap.read()\\r\\n    if success:\\r\\n# resize the input frame\\r\\n        im0 = cv2.resize(im0, (0, 0), fx=0.5, fy=0.5)\\r\\n# Invoke the YOLOv8 model to track the person object.\\r\\n        tracks = model.track(im0, show=False, persist=True, verbose=False, classes=0)\\r\\n# Invoke the queue management method provided by Ultralytics.\\r\\n        out = queue.process_queue(im0, tracks)\\r\\n# save the result\\r\\n        video_writer.write(im0)\\r\\n        if cv2.waitKey(1) & 0xFF == ord(\'q\'):\\r\\n            break\\r\\n        continue\\r\\n    print(\\"Video frame is empty or video processing has been successfully completed.\\")\\r\\n    break\\r\\n#  close video and window\\r\\ncap.release()\\r\\ncv2.destroyAllWindows()\\r\\n```\\r\\n\\r\\nHowever, the final output of these current application is edited video, which is intended for human checking, it can not provide direct information to machines or other applications. So, I\'ve customized a new class that base on ultralytics to direct output people flow information. Let\'s run this script to try it out.\\r\\n\\r\\n(\u8fd0\u884c\u7b2c\u4e8c\u4e2a\u811a\u672c)\\r\\n\\r\\nYou can see that the number of object in the defined region is shown in real time in the terminal.\\r\\n\\r\\nIn fact, ultralytics can do much more than that. We can also use it to generate density maps to help retail stores plan store space in a better way.\\r\\nSo I\'m going to show you this demo of a heat map.\\r\\n\\r\\n\uff08\u8fd0\u884c\u7b2c\u4e09\u4e2a\u811a\u672c\uff09\\r\\n\\r\\nWe can clearly see the distribution density of customers in each region during a certain period of time.\\r\\n\\r\\n\\r\\nThat is all of the live demo presentation. Thank you very much."},{"id":"person-info/update-site","metadata":{"permalink":"/blog/person-info/update-site","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/person-info/update-site.md","source":"@site/blog/person-info/update-site.md","title":"Update Site","description":"Please refer this page for update.","date":"2024-04-06T15:19:13.000Z","formattedDate":"April 6, 2024","tags":[{"label":"update","permalink":"/blog/tags/update"}],"readingTime":0.115,"hasTruncateMarker":false,"authors":[{"name":"Youjiang","title":"Site Owner","url":"https://yuyoujiang.github.io/","imageURL":"https://github.com/yuyoujiang.png","key":"youjiang"}],"frontMatter":{"slug":"person-info/update-site","title":"Update Site","authors":"youjiang","tags":["update"]},"unlisted":false,"prevItem":{"title":"yolo-live-demo","permalink":"/blog/yolo-live-demo"},"nextItem":{"title":"Welcom","permalink":"/blog/person-info/welcom"}},"content":"Please refer [this page](https://docusaurus.io/docs/deployment) for update.\\r\\n\\r\\n```sh\\r\\nyarn start\\r\\n```\\r\\n\\r\\n```sh\\r\\nyarn build\\r\\n```\\r\\n\\r\\n```sh\\r\\ncmd /C \\"set \\"GIT_USER=yuyoujiang\\" && yarn deploy\\"\\r\\n```"},{"id":"person-info/welcom","metadata":{"permalink":"/blog/person-info/welcom","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/person-info/welcom.md","source":"@site/blog/person-info/welcom.md","title":"Welcom","description":"Hello everyone!","date":"2024-04-06T15:19:13.000Z","formattedDate":"April 6, 2024","tags":[{"label":"update","permalink":"/blog/tags/update"}],"readingTime":0.01,"hasTruncateMarker":false,"authors":[{"name":"Youjiang","title":"Site Owner","url":"https://yuyoujiang.github.io/","imageURL":"https://github.com/yuyoujiang.png","key":"youjiang"}],"frontMatter":{"slug":"person-info/welcom","title":"Welcom","authors":"youjiang","tags":["update"]},"unlisted":false,"prevItem":{"title":"Update Site","permalink":"/blog/person-info/update-site"},"nextItem":{"title":"E-mails","permalink":"/blog/person-info/youjiang-emails"}},"content":"Hello everyone!"},{"id":"person-info/youjiang-emails","metadata":{"permalink":"/blog/person-info/youjiang-emails","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/person-info/youjiang-emails.md","source":"@site/blog/person-info/youjiang-emails.md","title":"E-mails","description":"seeed studio : youjiang.yu@seeed.cc","date":"2024-04-06T13:35:34.000Z","formattedDate":"April 6, 2024","tags":[{"label":"email","permalink":"/blog/tags/email"},{"label":"google","permalink":"/blog/tags/google"},{"label":"seeed","permalink":"/blog/tags/seeed"},{"label":"163","permalink":"/blog/tags/163"}],"readingTime":0.05,"hasTruncateMarker":false,"authors":[{"name":"Youjiang","title":"Site Owner","url":"https://yuyoujiang.github.io/","imageURL":"https://github.com/yuyoujiang.png","key":"youjiang"}],"frontMatter":{"slug":"person-info/youjiang-emails","title":"E-mails","authors":"youjiang","tags":["email","google","seeed","163"]},"unlisted":false,"prevItem":{"title":"Welcom","permalink":"/blog/person-info/welcom"}},"content":"**seeed studio :** youjiang.yu@seeed.cc\\r\\n\\r\\n**google :** yuyoujiang97@gmail.com\\r\\n\\r\\n**NetEase :** Youjiang163@163.com"}]}')}}]);