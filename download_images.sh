#!/bin/bash

BASE="http://ecstel.co.kr"
OUT="dist"

# 이미지 경로 목록
images=(
  "/NEW/images/common/eng_off.png"
  "/NEW/images/common/kor_on.png"
  "/NEW/images/common/mobile_btn.png"
  "/NEW/images/common/mobile_x_btn.jpg"
  "/NEW/images/common/sns_fb.png"
  "/NEW/images/common/sns_gg.png"
  "/NEW/images/common/sns_in.png"
  "/NEW/images/common/sns_insta.png"
  "/NEW/images/common/sns_yt.png"
  "/NEW/images/gnbK/newlogo.png"
  "/NEW/images/kor/copyright.png"
  "/NEW/images/kor/cus_logo_01.png"
  "/NEW/images/kor/cus_logo_02.png"
  "/NEW/images/kor/cus_logo_03.png"
  "/NEW/images/kor/cus_logo_04.png"
  "/NEW/images/kor/cus_logo_05.png"
  "/NEW/images/kor/cus_logo_06.png"
  "/NEW/images/kor/cus_logo_07.png"
  "/NEW/images/kor/cus_logo_08.png"
  "/NEW/images/kor/cus_logo_09.png"
  "/NEW/images/kor/cus_logo_10.png"
  "/NEW/images/kor/cus_logo_11.png"
  "/NEW/images/kor/cus_logo_12.png"
  "/NEW/images/kor/cus_logo_13.png"
  "/NEW/images/kor/cus_logo_14.png"
  "/NEW/images/kor/cus_logo_15.png"
  "/NEW/images/kor/cus_logo_16.png"
  "/NEW/images/kor/cus_logo_17.png"
  "/NEW/images/kor/cus_logo_18.png"
  "/NEW/images/kor/cus_logo_19.png"
  "/NEW/images/kor/cus_logo_20.png"
  "/NEW/images/kor/part_logo_01.png"
  "/NEW/images/kor/part_logo_02.png"
  "/NEW/images/kor/part_logo_03.png"
  "/NEW/images/kor/part_logo_04.png"
  "/NEW/images/kor/part_logo_05.png"
  "/NEW/images/kor/part_logo_06.png"
  "/NEW/images/kor/part_logo_07.png"
  "/NEW/images/kor/s1_icon01.png"
  "/NEW/images/kor/s1_icon02.png"
  "/NEW/images/kor/s1_icon03.png"
  "/NEW/images/kor/s1_icon04.png"
)

echo "이미지 다운로드 시작..."
for img in "${images[@]}"; do
  localpath="${OUT}${img}"
  dir=$(dirname "$localpath")
  mkdir -p "$dir"
  curl -sL "${BASE}${img}" -o "$localpath" && echo "✅ $img" || echo "❌ $img"
done

echo "완료!"

