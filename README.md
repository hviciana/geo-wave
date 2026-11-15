<p align="center">
  <img src="public/assets/geo-wave-logo.png" alt="GEO-WAVE logo" width="240">
</p>

# Geo-wave

**Project overview for the NASA Hackathon**

---

## 1. Solution

Geo-wave is a web tool that turns NASA satellite and model data into clear, verified answers about change on Earth. In a few steps, a user selects a place and a period, chooses the variables to study, and sees:

- **What** is changing
- **Where** it is changing
- **How much** it is changing
- **Whether** the change is supported by the data

## 2. Visualization

- **3D globe and regional terrain:** select any area on the globe, then open it as a 3D model with satellite imagery draped over the terrain.
- **Layer selection:** switch on one variable at a time, from 13 layers including true-color imagery, precipitation (GPM), vegetation (MODIS NDVI), soil moisture, CO, CO₂, NO₂, and ozone.
- **Before/after comparison:** a draggable split view shows the same place on two dates.
- **Change maps:** color-coded maps show where change is reliable. Orange marks decrease, green marks increase, and grey marks no reliable change.
- **Timeline and playback:** play, loop, and change speed (0.5×, 1×, 2×) across pre-event, event, and post-event phases.
- **Point analysis:** click any spot to see its coordinates, elevation, and trend.

## 3. Key Strengths

- **Measured, not just pictured.** Callouts report exact values, such as a 5.6 dB drop in radar signal after the Los Angeles fire, a ±170 cm ground displacement in Kamchatka, and 315 mm of rain in Málaga.
- **Built-in confidence.** A "Sustained real change" badge appears only when several independent variables agree. "No reliable change" marks places where the data cannot support a conclusion.
- **Transparent data.** Real observations are labelled "Dato real" and separated from interpolated values, which carry a percentage. A "Real passes only" toggle excludes interpolated frames.
- **Guided for everyone.** A four-step workflow (Choose event, Explore, Compare, Result) leads new users, while a plain view and a scientific-data view serve both general audiences and experts.
- **Ready to explore.** Three demonstration cases (Los Angeles wildfire, Kamchatka earthquake, Málaga flood) run without setup.
- **Accessible.** Keyboard control of the comparison divider, a guided tour, and accessibility settings are included.

## 4. Data Sources

USGS Earthquake Hazards · NISAR (L-band radar) · ARIA InSAR · MERRA-2 · GPM · MODIS · VIIRS · AIRS · OMI · Digital Elevation Model

Access is through NASA Earthdata and GES DISC, with visualization through NASA Giovanni.

## 5. Challenge Fit

| Challenge requirement | Geo-wave delivers |
|---|---|
| Select variables | 13 selectable layers from missions and models |
| Visualize change over time | Timeline, playback, phases, before/after split |
| What / where | Change maps, legends, point analysis |
| How much | Measured values with units (dB, cm, mm, magnitude) |
| Significant | Sustained-change badge, reliability labels, multi-variable checks |

## 6. Summary

Geo-wave makes satellite data from many missions usable in one place. It shows what changed, where, and by how much, and it tells the user when the evidence is strong enough to trust.