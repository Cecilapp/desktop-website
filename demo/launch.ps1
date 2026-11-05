Get-Process cecil-desktop -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep 3
Set-Content -Path "$env:APPDATA\cecil-desktop\window-state-main.json" -Value '{"width":1280,"height":797,"x":40,"y":40,"displayBounds":{"x":0,"y":0,"width":2752,"height":1152},"isMaximized":false,"isFullScreen":false}'
Remove-Item Env:ELECTRON_RUN_AS_NODE -ErrorAction SilentlyContinue
Start-Process -FilePath "$env:LOCALAPPDATA\Programs\cecil-desktop\cecil-desktop.exe" -ArgumentList '--remote-debugging-port=9333' | Out-Null
Start-Sleep 18
