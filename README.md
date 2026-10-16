# SVV テスト（SVV・SVH）

2026-10-16 に名前を「線をまっすぐ」から「SVV テスト」に替え、配色を黒にした（宮崎さん）。解説ページ `about.html`（論文・Vestibular Rehabilitation・Z-Health・Carrick から。出典つき）をアプリから開ける。

暗い画面の赤い線を、スマホを傾けて「まっすぐ縦」（SVV＝主観的垂直）・「まっすぐ横」（SVH＝主観的水平）に合わせるチェック。
FNT の PWA（GitHub Pages）。カメラは使わない。スマホの加速度（重力の向き）だけで測る。

- 公開：https://hokutomiyazaki-arch.github.io/svv-check/ （スタッフ用＝判定と数字を出す：`?staff=1`）
- もと：`~/FNT-Apps/fnt-camera-check` の「14. 線をまっすぐにする」を 2026-10-16 に切り出した。読み方・しきい値・出典は index.html の冒頭のコメント
- 縦4回・横4回。始めは右・左へ交互に12〜20°。1回10秒で最後の1.5秒を読む。10°以上外れた回は平均から外す
- しきい値：SVV 2.5°・SVH 1.5°以上。＋＝時計回り＝本人の右（Z-Health 9S Next Evolution p.27–28）
- お客さんの画面は「記録しました」だけ。記録は端末の localStorage（`svv_runs`・最新30件）。スタッフ表示のメニューから全部コピーできる
- iPhone は「始める」を押したときに動きの許可を聞く（DeviceMotionEvent.requestPermission）
- 声：`tools/voice_build.py`（ElevenLabs・リョウ。カメラでチェックに同じ文があれば写す）
- 骨格は `~/FNT-Apps/pinto-8`（スプラッシュ・☰メニュー・M PLUS Rounded 1c・SW Network First・著作権）

## 確かめ方
`python3 -m http.server 8790` で開き、コンソールで `__setRoll(度)` を入れるとスマホの傾きを模擬できる（`document.body.dataset.svv` にいまの線の向き）。
