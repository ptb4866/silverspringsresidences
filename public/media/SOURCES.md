# Media and font sources

## Lifestyle hero video

- Creator: RDNE Stock project.
- Source: https://www.pexels.com/video/elderly-man-painting-while-talking-to-a-woman-5762541/
- Original file: https://videos.pexels.com/video-files/5762541/5762541-uhd_3840_2160_24fps.mp4
- License: Pexels License, https://www.pexels.com/license/ (reviewed October 10, 2026). Free commercial reuse and modification; no subject endorsement is implied.
- Local derivative: `creative-lifestyle.mp4`, 12 seconds starting at second 1, 1280 x 720, H.264, no audio, CRF 27, playback slowed to 74% for restrained motion, fast-start metadata. Approximately 1.22 MB.
- Desktop poster extracted at second 2 and resized to 1600 x 900 WebP; mobile poster uses a separate 750 x 1000 crop.
- This is illustrative lifestyle footage, not a depiction of a Silver Springs resident or property, and does not assert that an art program is offered.

## Contact hero photograph

- Creator: Jsme MILA.
- Source: https://www.pexels.com/photo/woman-taking-care-of-old-people-16364305/
- Original file: https://images.pexels.com/photos/16364305/pexels-photo-16364305.jpeg
- License: Pexels License, https://www.pexels.com/license/ (reviewed October 10, 2026). Free commercial reuse and modification; no subject endorsement is implied.
- Local derivatives: `contact-care.webp` (1800 x 1200) and `contact-care-mobile.webp` (750 x 1000), WebP quality 83.
- Stock caregiving photograph for illustration; not a depiction of Silver Springs staff, residents, or property.

## Existing repository imagery

The following files are optimized derivatives of assets already present in this repository:

| Local derivative | Existing source |
| --- | --- |
| `residence-exterior.webp` | `/public/senior-care-home-exterior.png` |
| `residence-living.webp` | `/public/cozy-senior-living-room.png` |
| `personalized-care.webp` | `/public/caregiver-helping-senior.png` |
| `everyday-living.webp` | `/public/senior-living-common-area-fireplace.png` |

These inherited assets have no source/license metadata in the original repository and should be treated as illustrative rather than verified property photography. Their existing provenance is preserved, not newly asserted. The homepage includes a caption directing visitors to the team for current home photos. Replace them with verified property photos when available.

## Fonts

- Libre Baskerville: https://fontsource.org/fonts/libre-baskerville
- Manrope: https://fontsource.org/fonts/manrope
- Both are installed through Fontsource, bundled locally by Vite, and distributed under the SIL Open Font License. License copies are included in this folder.
- Oakmont's Albra and Avenir Next font files, branding, photos, and video are not used.

## Reproducing the video derivative

Using an installed FFmpeg executable and the original footage:

```sh
ffmpeg -ss 1 -i source.mp4 -t 12 -an -vf "setpts=1.35*PTS,scale=1280:-2" -r 24 -c:v libx264 -preset medium -crf 27 -pix_fmt yuv420p -movflags +faststart creative-lifestyle.mp4
```

FFmpeg is a media preparation tool only; it is not required to install or run the site.

## Logo icon and favicon

The three-leaf and water-ripple SVG icon was recreated from the owner-supplied `Site Logo.jpg` reference. It retains the site wordmark typography and muted gold color. `public/favicon.svg`, PNG favicon, Apple touch icon, and ICO share that icon. The residence collage reuses the existing exterior and living-room illustrations listed above.

## Services page photography (October 24, 2026)

All four new images use the Pexels License (https://www.pexels.com/license/), reviewed October 24, 2026. Commercial use and modification are permitted; no endorsement is implied. These stock images do not depict Silver Springs residents, staff, meals, or property.

| Local file | Creator | Source |
| --- | --- | --- |
| `dining-together.webp` | Mike Jones | https://www.pexels.com/photo/an-elderly-couple-sitting-at-a-table-8805842/ |
| `dining-gathering.webp` | Alena Darmel | https://www.pexels.com/photo/elderly-people-having-a-gathering-8153746/ |
| `activities-movement.webp` | Barbara Olsen | https://www.pexels.com/photo/an-elderly-man-doing-exercise-on-the-street-7870244/ |
| `activities-reading.webp` | cottonbro studio | https://www.pexels.com/photo/elderly-woman-wearing-eyeglasses-5959754/ |

Original images: `https://images.pexels.com/photos/{photo-id}/pexels-photo-{photo-id}.jpeg`. Locally resized to at most 1500 x 1200 pixels and encoded as WebP quality 82. New pages also reuse the licensed contact caregiving photo and painting-video poster documented above.

## Temporary sample menu

`sample-menu.pdf` is an original illustrative seven-day example, created for this site. It is not a current meal schedule or an approved medical diet. Fonts are the same open-source Manrope and Libre Baskerville used by the site. Replace this file with the owner's final menu at the same path when available.
