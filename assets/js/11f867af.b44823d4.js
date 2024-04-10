"use strict";(self.webpackChunkyoujiang_site=self.webpackChunkyoujiang_site||[]).push([[387],{9673:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>l,toc:()=>d});var t=s(4848),i=s(8453);const r={title:"Image Fusion with Yolo",slug:"/image-fusion",sidebar_position:3},o="Paste Texture into Target Image with YOLOv8",l={id:"image-fusion-with-yolov8",title:"Image Fusion with Yolo",description:"pic1",source:"@site/docs/image-fusion-with-yolov8.md",sourceDirName:".",slug:"/image-fusion",permalink:"/docs/image-fusion",draft:!1,unlisted:!1,editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/image-fusion-with-yolov8.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{title:"Image Fusion with Yolo",slug:"/image-fusion",sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Exercise Counter",permalink:"/docs/exercise-counter"}},c={},d=[{value:"Introduction",id:"introduction",level:2},{value:"Installation",id:"installation",level:2},{value:"Prepare Model File",id:"prepare-model-file",level:2},{value:"Let&#39;s Run It!",id:"lets-run-it",level:2},{value:"References",id:"references",level:2}];function a(e){const n={a:"a",br:"br",code:"code",h1:"h1",h2:"h2",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"paste-texture-into-target-image-with-yolov8",children:"Paste Texture into Target Image with YOLOv8"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.img,{alt:"pic1",src:s(2704).A+"",width:"640",height:"360"})}),"\n",(0,t.jsx)(n.p,{children:"This is a image fusion demo with YOLOv8.\r\nYou can use this project to paste a specific texture on the left shoulder of pedestrian objects in the input image.\r\nSpecifically, using YOLOv8 to detect keypoint information in the input image, adjust the size and position of the texture based on the keypoints."}),"\n",(0,t.jsxs)(n.p,{children:["This has been tested and deployed on a ",(0,t.jsx)(n.a,{href:"https://www.seeedstudio.com/reComputer-J4012-p-5586.html",children:"reComputer Jetson J4012"}),".\r\nHowever, you can use any NVIDIA Jetson device to deploy this demo."]}),"\n",(0,t.jsx)(n.h2,{id:"introduction",children:"Introduction"}),"\n",(0,t.jsx)(n.p,{children:"Select the position coordinates of the nose and left shoulder from the inference results of YOLOv8-Pose.\r\nDetermine the size of the texture based on the distance between the nose and shoulder.\r\nDetermine the position of the texture based on the location of the left shoulder.\r\nBased on above-mentioned mechanism, we can fusion two images and produce a very interesting application."}),"\n",(0,t.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Step 1:"})," Flash JetPack OS to reComputer Jetson device ",(0,t.jsx)(n.a,{href:"https://wiki.seeedstudio.com/reComputer_J4012_Flash_Jetpack/",children:"(Refer to here)"}),"."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Step 2:"})," Access the terminal of Jetson device, install pip and upgrade it"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"sudo apt update\r\nsudo apt install -y python3-pip\r\npip3 install --upgrade pip\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Step 3:"})," Clone the following repo"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"mkdir demo && cd demo\r\ngit clone https://github.com/ultralytics/ultralytics.git\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Step 4:"})," Open requirements.txt"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"cd ultralytics\r\nvi requirements.txt\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Step 5:"})," Edit the following lines. Here you need to press i first to enter editing mode. Press ESC, then type ",":wq"," to save and quit"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"# torch>=1.7.0\r\n# torchvision>=0.8.1\n"})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Note:"})," torch and torchvision are excluded for now because they will be installed later."]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Step 6:"})," Install the necessary packages"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"pip3 install -e .\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Step 7:"})," If there is an error in numpy version, install the required version of numpy"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"pip3 install numpy==1.20.3\n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Step 8:"})," Install PyTorch and Torchvision ",(0,t.jsx)(n.a,{href:"https://wiki.seeedstudio.com/YOLOv8-DeepStream-TRT-Jetson/#install-pytorch-and-torchvision",children:"(Refer to here)"}),"."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Step 9:"})," Run the following command to make sure yolo is installed properly"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"yolo detect predict model=yolov8n.pt source='https://ultralytics.com/images/bus.jpg' \n"})}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Step 10:"})," Clone exercise counter demo"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"cd ..\r\ngit clone https://github.com/yuyoujiang/Paste-Texture-into-Target-Image-with-YOLOv8.git\n"})}),"\n",(0,t.jsx)(n.h2,{id:"prepare-model-file",children:"Prepare Model File"}),"\n",(0,t.jsx)(n.p,{children:"YOLOv8-pose pretrained pose models are PyTorch models and you can directly use them for inferencing on the Jetson device. However, to have a better speed, you can convert the PyTorch models to TensorRT optimized models by following below instructions."}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Step 1:"})," Download model weights in PyTorch format ",(0,t.jsx)(n.a,{href:"https://docs.ultralytics.com/tasks/pose/#models",children:"(Refer to here)"}),"."]}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Step 2:"})," Execute the following command to convert this PyTorch model into a TensorRT model"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"# TensorRT FP32 export\r\nyolo export model=<path to model>/yolov8m-pose.pt format=engine device=0\r\n\r\n# TensorRT FP16 export\r\nyolo export model=<path to model>/yolov8m-pose.pt format=engine half=True device=0\n"})}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Tip:"})," ",(0,t.jsx)(n.a,{href:"https://docs.ultralytics.com/modes/export",children:"Click here"})," to learn more about yolo export"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"Step 3:"})," Organize resource files(model weights and textures)."]}),"\n"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"mkdir sources\r\n\r\ndemo\r\n\u251c\u2500\u2500 ultralytics\r\n\u251c\u2500\u2500 Paste-Texture-into-Target-Image-with-YOLOv8\r\n    \u251c\u2500\u2500 MakerFinding.py\r\n    \u251c\u2500\u2500 soueces\r\n        \u251c\u2500\u2500 makey02.png\r\n        \u251c\u2500\u2500 yolov8m-pose.pt\r\n         ... \n"})}),"\n",(0,t.jsx)(n.h2,{id:"lets-run-it",children:"Let's Run It!"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-sh",children:"python3 MakerFinding.py --model_path ./sources/yolov8m-pose.pt --input 0 --texture_path ./sources/makey02.png\n"})}),"\n",(0,t.jsx)(n.h2,{id:"references",children:"References"}),"\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.a,{href:"https://github.com/ultralytics/",children:"https://github.com/ultralytics/"}),(0,t.jsx)(n.br,{}),"\n",(0,t.jsx)(n.a,{href:"https://wiki.seeedstudio.com/YOLOv8-DeepStream-TRT-Jetson/",children:"https://wiki.seeedstudio.com"})]})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},2704:(e,n,s)=>{s.d(n,{A:()=>t});const t=s.p+"assets/images/cover-image-fusion-e03596a241dddec3e75779b81c331649.gif"},8453:(e,n,s)=>{s.d(n,{R:()=>o,x:()=>l});var t=s(6540);const i={},r=t.createContext(i);function o(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);