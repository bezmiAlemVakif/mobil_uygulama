FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive
ENV ANDROID_SDK_ROOT=/opt/android-sdk
ENV PATH="${PATH}:/opt/android-sdk/cmdline-tools/latest/bin:/opt/android-sdk/platform-tools:/opt/android-sdk/cmdline-tools/latest/bin"

RUN apt-get update && apt-get install -y --no-install-recommends \
  curl \
  wget \
  unzip \
  git \
  ca-certificates \
  openjdk-17-jdk \
  && rm -rf /var/lib/apt/lists/*

# Node.js 18
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
  && apt-get install -y nodejs \
  && npm i -g @ionic/cli @capacitor/cli \
  && npm cache clean --force

RUN mkdir -p ${ANDROID_SDK_ROOT}
WORKDIR /opt

# Install Android SDK command-line tools
RUN wget -q https://dl.google.com/android/repository/commandlinetools-linux-9477386_latest.zip -O /tmp/cmdline-tools.zip \
  && mkdir -p ${ANDROID_SDK_ROOT}/cmdline-tools \
  && unzip -q /tmp/cmdline-tools.zip -d ${ANDROID_SDK_ROOT}/cmdline-tools \
  && mv ${ANDROID_SDK_ROOT}/cmdline-tools/cmdline-tools ${ANDROID_SDK_ROOT}/cmdline-tools/latest \
  && rm /tmp/cmdline-tools.zip

ENV PATH="/opt/android-sdk/cmdline-tools/latest/bin:/opt/android-sdk/platform-tools:${PATH}"

# Accept licenses and install platform-tools + build tools + an Android platform
RUN yes | sdkmanager --sdk_root=${ANDROID_SDK_ROOT} --licenses || true
RUN sdkmanager --sdk_root=${ANDROID_SDK_ROOT} "platform-tools" "platforms;android-33" "build-tools;33.0.2" "cmdline-tools;latest"

# Workspace mount
WORKDIR /workspace

CMD ["/bin/bash"]
