# A sky for Divya ✧
A complete, dependency-free birthday website. Works on GitHub Pages, including project URLs. No npm, build step, server, API keys or external fonts required.

## Add your three photos and one video
Put your files inside the included `assets` folder, using these exact lowercase names:

| File | Appears in |
| --- | --- |
| `assets/photo-1.jpg` | First photograph |
| `assets/photo-2.jpg` | Second photograph |
| `assets/photo-3.jpg` | Third photograph |
| `assets/our-video.mp4` | Video player below photographs |

Use real JPEG images, not PNGs renamed to `.jpg`. If your files have other names or formats, change the matching paths in `config.js`. Portrait photos work best; the frames crop to 4:5. Change `object-fit: cover` to `object-fit: contain` in `style.css` if you want every edge visible. MP4 encoded with H.264 video and AAC audio is a broadly compatible option. Compress large videos before upload. Playback uses a play button so mobile browsers do not block audio autoplay. Until files are added, intentional illustrated text placeholders appear instead of broken media.

## Personalise
Edit `config.js` in a text editor:
- `stars`: the ten titles and love notes. Replace these suggested notes with your real memories if you like. Keep exactly ten entries.
- `photos`: image paths, captions and accessible descriptions.
- `video`: video path.
- `message`: the requested birthday message, preserved exactly.
- `birthday`: set to `2026-10-16T00:00:00+05:30` — **16 October 2026, 12:00 AM India time**. This is the same instant as 15 October, 18:30 UTC; it does not change if she visits from another timezone.

## Publish on GitHub Pages
1. Extract this ZIP.
2. Create a GitHub repository (for example `divyas-stars`).
3. Upload the **contents** of this folder into the repository root. `index.html` must be at the root, not inside another `divyas-stars` folder. Include `style.css`, `config.js`, `app.js`, and `assets` with your media. The empty `.nojekyll` file is included but optional for this plain site.
4. Open repository **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**, then `main` and `/ (root)`, and save.
6. Wait for the Pages deployment to finish. Share the URL GitHub displays, usually `https://YOUR-USERNAME.github.io/divyas-stars/`.

The website and its uploaded media are accessible to visitors who can access the published Pages URL. A static countdown is a presentation effect: the future message is already in the source code.

## How the surprise works
- Each of the ten stars opens a love note and stays illuminated for that visit.
- Reopening one star does not advance the unique count.
- Closing the tenth discovered note rearranges all ten stars into a heart; a shooting star crosses the sky.
- At the deadline, the birthday letter opens automatically with a shower of shooting stars, regardless of discovery progress.
- Opening the page after the deadline also shows the birthday letter. A replay button becomes available.
- The page checks the deadline when returning to an inactive tab. Browser timers cannot run reliably while a phone/browser is asleep, so it shows the surprise on return. Keep the page open and device awake for the exact live countdown.
- Time comes from the visitor's device clock; make sure it is correct.
- Each reload starts a fresh exploration and replays the birthday reveal if its time has arrived.
- Keyboard: Tab between stars and controls, Enter/Space to open, Escape to close a letter. Reduced motion and the Pause motion button suppress the star shower and movement.

## Test before sending
Open `index.html` locally to try the experience. Click all ten stars and close the last note to see the heart. To test midnight, temporarily change `birthday` in `config.js` to a time about a minute ahead, reload, and watch it cross zero. Also try a past timestamp. **Restore `2026-10-16T00:00:00+05:30` before publishing.** Test uploaded photos and video on her likely phone/browser before sending the final link.
