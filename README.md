An AI-powered crowd monitoring system that detects overcrowding, estimates density, forecasts future crowd conditions, and generates real-time alerts to prevent stampedes.
Features · Architecture · Installation · Usage · Results · Team
</div>

📋 Table of Contents

About the Project
Problem Statement
Features
Architecture
Tech Stack
Installation
Dataset
Usage
Project Structure
Results
Modules
Future Work
References
Team
Acknowledgements


🔍 About the Project
Large-scale gatherings — festivals, rallies, railway stations, stadiums — are increasing globally, raising serious crowd safety concerns. Sudden stampedes and overcrowding frequently lead to injuries and fatalities. Traditional CCTV monitoring is limited: human operators cannot continuously track subtle crowd movements and often react too late during critical situations.
CrowdGuard leverages AI and Computer Vision to:

Automatically detect individuals and groups in dense crowds
Estimate real-time crowd density via heatmap generation
Forecast future crowd density using temporal analysis
Identify high-risk zones and generate preemptive alerts
Provide an interactive dashboard for authorities and event organizers


Academic Context: Major Project - II (18B19CI891), AY 2025-26, Mid-Term Evaluation — Jaypee University of Information Technology, Department of CSE & IT.


❗ Problem Statement
Current crowd monitoring systems face critical challenges:

Missed detections — Occlusions and variable lighting reduce accuracy, making systems unreliable during critical situations.
Reactive-only alerts — Existing systems provide notifications only after crowd density has already reached dangerous levels.
No forecasting — Without predicting future density, authorities face delayed responses, increasing the risk of stampedes and injuries.

CrowdGuard addresses these gaps by combining real-time detection with predictive forecasting and proactive alert generation.

✨ Features
FeatureDescriptionCrowd DetectionYOLOv8-based person detection with bounding boxes, even in occluded environmentsDensity EstimationGaussian-based heatmap generation using MCNN (Multi-Column CNN) with K-means clustering to identify dense zonesCrowd ForecastingCrowdMAC algorithm with Temporal-Density-Aware Masking for predicting future density mapsRisk AnalysisThreshold-based danger zone detection with risk scoring (>4 people/m² triggers alert)Interactive DashboardReal-time visualization with heatmap overlays, alert interface, and control panelMulti-Angle AnalysisUpload up to 3 images from different angles for more accurate scene assessment

🏗 Architecture
CrowdGuard follows a modular pipeline architecture with six interconnected modules:
┌─────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  CCTV Feed / │────▶│  MODULE 1        │────▶│  MODULE 2        │
│  Image Input │     │  Data Preprocessing│    │  Crowd Detection │
└─────────────┘     │  • Image Resizing │     │  • YOLOv8 / DETR │
                    │  • Normalization  │     │  • Bounding Boxes │
                    │  • Augmentation   │     │  • Occlusion      │
                    └──────────────────┘     │    Handling       │
                                             └────────┬─────────┘
                                                      │
                                                      ▼
┌──────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│  MODULE 5        │◀────│  MODULE 4        │◀────│  MODULE 3        │
│  Risk Analysis   │     │  Crowd           │     │  Density         │
│  & Alerts        │     │  Forecasting     │     │  Estimation      │
│  • Threshold     │     │  • CrowdMAC      │     │  • Heatmaps      │
│    Checking      │     │  • TDM Masking   │     │  • K-means       │
│  • Danger Zones  │     │  • Future        │     │    Clustering    │
│  • Risk Scoring  │     │    Prediction    │     │  • KNN Analysis  │
│  • Alert Gen     │     └──────────────────┘     └──────────────────┘
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│  MODULE 6        │
│  Visualization   │
│  Dashboard       │
│  • Real-time     │
│    Display       │
│  • Heatmap       │
│    Overlay       │
│  • Alert Panel   │
└──────────────────┘
End-to-End Flow
Frames → Tensor Conversion → Model Prediction → Density Map → Risk Analysis → Visualization
Performance Targets
MetricTargetDetection Accuracy>90%Processing Speed<2 sec/imageRisk Prediction>85%

🛠 Tech Stack
Programming Language

Python 3.10

Core Libraries & Frameworks
CategoryToolsDeep LearningPyTorch, TensorFlow 2.5Object DetectionYOLOv8 (Ultralytics), DETRComputer VisionOpenCVCrowd ForecastingCrowdMACCNN ArchitectureMCNN (Multi-Column CNN)Data ProcessingNumPy, Pandas, SciPyVisualizationMatplotlib, SeabornMachine LearningScikit-learnDashboardStreamlit
Development Tools
ToolPurposeJupyter Notebook v7Experimentation & prototypingVS CodePrimary IDEGitHubVersion controlGoogle ColabGPU-accelerated training

⚙ Installation
Prerequisites

Python 3.10+
CUDA-compatible GPU (recommended for training)
pip or conda package manager

Setup
bash# 1. Clone the repository
git clone https://github.com/<your-username>/CrowdGuard.git
cd CrowdGuard

# 2. Create a virtual environment
python -m venv venv
source venv/bin/activate        # Linux/macOS
# venv\Scripts\activate          # Windows

# 3. Install dependencies
pip install -r requirements.txt

# 4. Download pretrained weights (if available)
python scripts/download_weights.py
Requirements (requirements.txt)
torch>=2.0.0
torchvision>=0.15.0
ultralytics>=8.0.0
opencv-python>=4.8.0
numpy>=1.24.0
pandas>=2.0.0
scipy>=1.10.0
matplotlib>=3.7.0
seaborn>=0.12.0
scikit-learn>=1.3.0
streamlit>=1.28.0
Pillow>=10.0.0

📊 Dataset
Primary Dataset: ShanghaiTech
PropertyDetailTotal Images1,198Total Annotations330,165Part AHighly dense crowd scenesPart BMedium density street scenesAnnotation TypePoint-level head annotationsDensity MapsGaussian-based
Additional Datasets
DatasetUse CaseUMN Escape PanicAnomaly / stampede behavior detectionPKX-LHRAirport crowd scenariosSabrimalaDense pilgrimage crowd dataUCSDPedestrian counting and density
Dataset Preparation
bash# Directory structure expected
data/
├── ShanghaiTech/
│   ├── part_A/
│   │   ├── train_data/
│   │   │   ├── images/
│   │   │   └── ground-truth/
│   │   └── test_data/
│   │       ├── images/
│   │       └── ground-truth/
│   └── part_B/
│       ├── train_data/
│       └── test_data/
└── UCSD/
    └── Peds1/
        ├── Frames/
        └── GroundTruth.mat
The preprocessing pipeline automatically handles cleanup, path setup, and dataset verification.

🚀 Usage
1. Training
bash# Train the MCNN model on ShanghaiTech Part A
python train.py --dataset shanghaitech --part A --epochs 200 --lr 1e-4

# Train on Part B
python train.py --dataset shanghaitech --part B --epochs 200 --lr 1e-4
2. Inference
bash# Run inference on a single image
python inference.py --image path/to/crowd_image.jpg --model weights/best_model.pth

# Run on a directory of images
python inference.py --dir path/to/images/ --model weights/best_model.pth
3. Launch Dashboard
bash# Start the Streamlit dashboard
streamlit run dashboard/app.py
4. Multi-Angle Analysis
bash# Analyze up to 3 images of the same scene from different angles
python multi_angle_analysis.py --images img1.jpg img2.jpg img3.jpg

📁 Project Structure
CrowdGuard/
│
├── README.md                    # This file
├── requirements.txt             # Python dependencies
├── LICENSE                      # License file
│
├── data/                        # Datasets (not tracked in git)
│   ├── ShanghaiTech/
│   └── UCSD/
│
├── models/                      # Model definitions
│   ├── mcnn.py                  # Multi-Column CNN architecture
│   ├── yolo_detector.py         # YOLOv8 person detection wrapper
│   ├── density_estimator.py     # Density map generation
│   └── crowd_forecaster.py      # CrowdMAC forecasting module
│
├── modules/                     # Core pipeline modules
│   ├── preprocessing.py         # Module 1: Data preprocessing
│   ├── detection.py             # Module 2: Crowd detection
│   ├── density.py               # Module 3: Density estimation
│   ├── forecasting.py           # Module 4: Crowd forecasting
│   ├── risk_analysis.py         # Module 5: Risk analysis & alerts
│   └── visualization.py         # Module 6: Dashboard & visualization
│
├── dashboard/                   # Streamlit dashboard
│   ├── app.py                   # Main dashboard application
│   ├── components/              # UI components
│   └── assets/                  # Static assets
│
├── scripts/                     # Utility scripts
│   ├── download_weights.py      # Download pretrained models
│   ├── generate_density_maps.py # Generate ground-truth density maps
│   └── evaluate.py              # Evaluation metrics
│
├── notebooks/                   # Jupyter notebooks
│   ├── 01_data_exploration.ipynb
│   ├── 02_model_training.ipynb
│   └── 03_evaluation.ipynb
│
├── weights/                     # Trained model weights (not tracked)
│
├── train.py                     # Training entry point
├── inference.py                 # Inference entry point
└── multi_angle_analysis.py      # Multi-angle stampede risk analysis

📈 Results
Quantitative Performance
DatasetTest ImagesScene TypeMAERMSEShanghaiTech Part A182Extremely congested62.1102.3ShanghaiTech Part B316Urban sidewalks & plazas19.830.1
Visual Outputs
The system produces three types of visual results:

Predicted Density Maps — Heatmap overlays showing estimated crowd distribution across the scene.
Forecasted Maps — Temporal predictions of future crowd density using CrowdMAC.
Crowd-Risk Cluster Visualization — K-means clustering of high-density zones with color-coded risk levels (Safe → Caution → Warning → Danger).

Risk Level Classification
LevelColorDensity ThresholdSafe🟢 Green< 2 people/m²Caution🟡 Yellow2–3 people/m²Warning🟠 Orange3–4 people/m²Danger🔴 Red> 4 people/m²

🧩 Modules
Module 1 — Data Collection & Preprocessing
Handles dataset loading, frame resizing, normalization, and data augmentation. Automatically removes duplicate folders and verifies dataset completeness.
Module 2 — Crowd Detection
Uses YOLOv8 and ST-DETR for person detection with bounding boxes. Includes occlusion handling for dense environments.
Module 3 — Crowd Density Estimation
Generates density maps using MCNN (Multi-Column Convolutional Network). Employs K-means clustering and KNN analysis to identify dense zones.
Module 4 — Crowd Forecasting
Implements CrowdMAC with Temporal-Density-Aware Masking (TDM) for predicting future crowd density. Provides 30–60 second ahead predictions.
Module 5 — Risk Analysis & Alerts
Performs threshold checking, danger zone detection, and risk scoring. Generates alerts when crowd density exceeds safety thresholds.
Module 6 — Visualization Dashboard
Real-time display with heatmap overlays, alert interface, and control panel. Built with Streamlit for interactive monitoring.

🔮 Future Work

 Convert offline prototype to a real-time system
 Integrate IoT sensors for vibration and crowd movement detection
 Add multi-camera spatial fusion for wider area coverage
 Extend to 3D crowd modeling
 Deploy as a mobile app / edge device solution
 Address privacy concerns with anonymization techniques
 Expand to more diverse datasets for better generalization


📚 References

F. Alghamdi, "An Enhanced Framework for Dense Crowd Abnormal Behavior Detection Using YOLOv8," Artificial Intelligence Review, 2025.
D. Suresh et al., "IntVAO Tracker for Monitoring Crowds," J. Visual Communication and Image Representation, 2025.
A. C. Cob-Parro et al., "Stampede Detector using Dense Optical Flow," Engineering Applications of AI, vol. 142, 2025.
A. Kumar, "Crowd Anomaly Estimation and Detection: A Review," Artificial Intelligence Review, 2024.
Z. Zhang, "Stampede Alert Clustering Algorithmic System Based on Tiny-Scale Strengthened DETR," arXiv Preprint, 2024.
L. Li, "CrowdMAC: Masked Crowd Density Completion for Robust Crowd Density Forecasting," arXiv Preprint, 2024.
K.-M. Ha, "Crowd Stampede Management at Sporting Events: A Systematic Literature Review," Movement & Sport Sciences, vol. 125, pp. 17–26, 2024.
S. Sharma et al., "Literature Review on Crowd Analysis Using Image Processing and Neural Networks," IJCRT, vol. 12, no. 12, 2024.
S. A. Rahane, "AI-Driven Crowd Surveillance for Real-Time Threat Detection in Urban Security," IJIRMPS, vol. 12, no. 5, 2024.
E. M. Imah and R. D. I. Puspitasari, "Violent Crowd Flow Detection from Surveillance Cameras using Deep Transfer Learning–GRU," ETRI Journal, vol. 46, no. 4, pp. 671–682, 2024.


👥 Team
MemberRoll No.ContributionAchintya Sharma221031001Project report, model training on various datasetsKhushi Mehta221030437Project presentation, model training on various datasetsSaksham Gupta221030268Project presentation, frontend developmentRaghav Sharma221031003Project report, dashboard implementation
Supervisor
Dr. Amit Kumar — Associate Professor, Department of CSE & IT, Jaypee University of Information Technology

🙏 Acknowledgements

Jaypee University of Information Technology — Department of Computer Science and Engineering & Information Technology
Dr. Amit Kumar — For guidance and supervision throughout the project
ShanghaiTech Dataset — For providing the primary crowd counting benchmark
Ultralytics — For the YOLOv8 object detection framework
CrowdMAC Authors — For the masked crowd density forecasting methodology


<div align="center">
Made with ❤️ by Group 5 | JUIT | AY 2025-26
</div>
