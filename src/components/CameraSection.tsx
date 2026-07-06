import React, { useRef, useState } from 'react';
import { View, Text, Pressable, StyleSheet, Platform, GestureResponderEvent } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';

const MAX_VIDEO_SECONDS = 60;
const PRESETS_HIDE_MS = 3000;

// Zoom presets. CameraView zoom is normalized 0..1.
// TODO: true 0.5x needs ultra-wide lens selection (not exposed by expo-camera yet).
const ZOOM_PRESETS: { label: string; zoom: number }[] = [
  { label: '.5', zoom: 0 },
  { label: '1×', zoom: 0.05 },
  { label: '2', zoom: 0.25 },
  { label: '5', zoom: 0.6 },
];

/**
 * Near-square camera frame. Side controls: flash, HD, dual cam, filters.
 * Pinch (two fingers) to zoom freely — preset buttons (.5 / 1× / 2 / 5) appear while zooming.
 * Double-tap flips. Below: upload | shutter (tap = photo, hold = video ≤60s) | flip.
 */
export default function CameraSection() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const [flash, setFlash] = useState(false);
  const [hd, setHd] = useState(true);
  const [dual, setDual] = useState(false); // dual capture: planned feature
  const [recording, setRecording] = useState(false);
  const [zoom, setZoom] = useState(0.05);
  const [showPresets, setShowPresets] = useState(false);

  const lastTap = useRef(0);
  const pinchDist = useRef(0);
  const zoomRef = useRef(0.05);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cameraRef = useRef<CameraView>(null);

  const flip = () => setFacing((f) => (f === 'back' ? 'front' : 'back'));

  const revealPresets = () => {
    setShowPresets(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowPresets(false), PRESETS_HIDE_MS);
  };

  const applyZoom = (z: number) => {
    const clamped = Math.min(1, Math.max(0, z));
    zoomRef.current = clamped;
    setZoom(clamped);
  };

  const touchDistance = (e: GestureResponderEvent) => {
    const [a, b] = e.nativeEvent.touches;
    return Math.hypot(a.pageX - b.pageX, a.pageY - b.pageY);
  };

  const onTouchMove = (e: GestureResponderEvent) => {
    if (e.nativeEvent.touches.length === 2) {
      const d = touchDistance(e);
      if (pinchDist.current === 0) {
        pinchDist.current = d;
        revealPresets();
        return;
      }
      const delta = (d - pinchDist.current) / 250; // pinch sensitivity
      pinchDist.current = d;
      applyZoom(zoomRef.current + delta);
      revealPresets();
    }
  };

  const onTouchEnd = (e: GestureResponderEvent) => {
    if (e.nativeEvent.touches.length < 2) pinchDist.current = 0;
  };

  const onFrameTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) flip(); // double-tap flips
    lastTap.current = now;
  };

  const takePhoto = async () => {
    if (!cameraRef.current) return;
    await cameraRef.current.takePictureAsync().catch(() => null);
    // TODO: preview + attach-to-task flow
  };

  const startVideo = async () => {
    if (!cameraRef.current || Platform.OS === 'web') return;
    setRecording(true);
    await cameraRef.current
      .recordAsync({ maxDuration: MAX_VIDEO_SECONDS })
      .catch(() => null);
    setRecording(false);
  };

  const stopVideo = () => {
    cameraRef.current?.stopRecording();
    setRecording(false);
  };

  const canUseCamera = permission?.granted;

  return (
    <View style={styles.wrap}>
      {/* Camera frame */}
      <Pressable
        style={styles.frame}
        onPress={onFrameTap}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {canUseCamera ? (
          <CameraView
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            facing={facing}
            enableTorch={flash}
            zoom={zoom}
            mode="video"
          />
        ) : (
          <Pressable style={styles.permission} onPress={requestPermission}>
            <Feather name="camera" size={36} color="#999" />
            <Text style={styles.permissionText}>Tap to enable camera</Text>
          </Pressable>
        )}

        {/* In-frame side controls */}
        <View style={styles.sideControls}>
          <Pressable style={styles.ctrl} onPress={() => setFlash((v) => !v)} accessibilityLabel="Flash">
            <Feather name={flash ? 'zap' : 'zap-off'} size={18} color="#fff" />
          </Pressable>
          <Pressable style={styles.ctrl} onPress={() => setHd((v) => !v)} accessibilityLabel="HD quality">
            <MaterialIcons name={hd ? 'hd' : 'sd'} size={20} color="#fff" />
          </Pressable>
          <Pressable style={[styles.ctrl, dual && styles.ctrlActive]} onPress={() => setDual((v) => !v)} accessibilityLabel="Dual camera">
            <MaterialIcons name="picture-in-picture-alt" size={18} color="#fff" />
          </Pressable>
          <Pressable style={styles.ctrl} accessibilityLabel="Filters">
            <Feather name="sliders" size={18} color="#fff" />
          </Pressable>
        </View>

        {/* Zoom presets — appear while pinching */}
        {showPresets && (
          <View style={styles.presetRow}>
            {ZOOM_PRESETS.map((p) => (
              <Pressable
                key={p.label}
                style={[styles.presetBtn, Math.abs(zoom - p.zoom) < 0.03 && styles.presetBtnActive]}
                onPress={() => {
                  applyZoom(p.zoom);
                  revealPresets();
                }}
                accessibilityLabel={`Zoom ${p.label}`}
              >
                <Text style={styles.presetText}>{p.label}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {recording && (
          <View style={styles.recBadge}>
            <View style={styles.recDot} />
            <Text style={styles.recText}>REC</Text>
          </View>
        )}
      </Pressable>

      {/* Capture row: upload | shutter | flip */}
      <View style={styles.captureRow}>
        <Pressable style={styles.sideBtn} accessibilityLabel="Upload image or clip (trim to 60s max)">
          <Feather name="upload" size={24} color="#333" />
        </Pressable>

        <Pressable
          style={[styles.shutter, recording && styles.shutterRecording]}
          onPress={takePhoto}
          onLongPress={startVideo}
          onPressOut={recording ? stopVideo : undefined}
          delayLongPress={250}
          accessibilityLabel="Tap for photo, hold for video"
        >
          <View style={styles.shutterInner} />
        </Pressable>

        <Pressable style={styles.sideBtn} onPress={flip} accessibilityLabel="Flip camera">
          <Feather name="refresh-cw" size={24} color="#333" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 0 },
  frame: {
    width: '100%',
    aspectRatio: 1 / 1.02, // near-square (trimmed so friends row clears bottom nav)
    borderRadius: 32,
    backgroundColor: '#d9d9d9',
    borderWidth: 1,
    borderColor: '#bbb',
    overflow: 'hidden',
  },
  permission: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  permissionText: { color: '#999', fontSize: 13 },
  sideControls: {
    position: 'absolute',
    right: 10,
    top: 14,
    gap: 10,
    alignItems: 'center',
  },
  ctrl: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctrlActive: { backgroundColor: 'rgba(0,0,0,0.7)' },
  presetRow: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 8,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderRadius: 999,
    padding: 4,
  },
  presetBtn: {
    minWidth: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  presetBtnActive: { backgroundColor: 'rgba(255,255,255,0.3)' },
  presetText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  recBadge: {
    position: 'absolute',
    top: 14,
    left: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  recDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff' },
  recText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  captureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 6,
  },
  sideBtn: { padding: 10 },
  shutter: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 4,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterRecording: { borderColor: '#000' },
  shutterInner: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#e6e6e6' },
});
