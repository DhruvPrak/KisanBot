# AI Prompt Testing — Week 7

Test case used for all variants: **crop = rice, problem = leaves turning brown**

## Variant A — Bare prompt (no role, no constraints)
**Prompt sent:**
`Crop: rice, Problem: leaves turning brown. What should I do?`

**Output:**
Please inspect the roots and base of the plants to see if there are any insects or rotten spots. If the soil is very dry, ensure you maintain a consistent water level, but if the field is waterlogged, drain the excess water to allow the roots to breathe. You should also check for small spots on the leaves; if these are spreading, apply a recommended fungicide immediately to stop further damage.

## Variant B — Role + constraints (used in the final app)
**Prompt sent:**
`You are an agricultural advisor for Indian farmers. A farmer growing "rice" reports this problem: "leaves turning brown". Give practical, concise advice (3-4 sentences) they can act on immediately. Avoid jargon.`

**Output:**
Inspect the base of the plant and the undersides of the leaves for signs of pests or irregular spots, as this could indicate a fungal infection or stem borer attack. Immediately remove and destroy any heavily affected leaves to prevent the problem from spreading to healthy parts of the field. Ensure your field has proper drainage, as standing, stagnant water can sometimes lead to root rot and browning leaves. If the browning is widespread, take a sample to your local agricultural office or "Krishi Vigyan Kendra" for a quick identification and specific treatment recommendation.

## Variant C — Role + constraints + numbered list format
**Prompt sent:**
`You are an agricultural advisor for Indian farmers. A farmer growing "rice" reports this problem: "leaves turning brown". Respond as a numbered list of 3 concise, practical steps they can act on immediately. Avoid jargon.`

**Output:**
As an agricultural advisor, here are three steps you should take immediately to address the browning of your rice leaves:
1. **Check for Pests or Disease:** Carefully inspect the leaves and stems. If you see spots, streaks, or small insects, take a few affected leaves to your local government agricultural office or a trusted dealer for a quick diagnosis so you can apply the correct treatment.
2. **Adjust Your Watering:** Ensure there is no standing water that has become stagnant, but do not let the soil dry out completely. If the field has been flooded for too long, drain the water for 2–3 days to let the roots "breathe" and receive oxygen, which helps prevent root rot.
3. **Review Fertilizer Use:** Too much nitrogen fertilizer can sometimes cause leaf burn. Stop applying any nitrogen-based fertilizers for now and check if the browning is occurring in patches (which suggests a disease) or across the whole field (which suggests a nutritional or water issue).

## Conclusion
Variant B was chosen for the final app. Variant A is the vaguest — it doesn't mention a specific local resource and jumps straight to "apply a recommended fungicide" without first suggesting the farmer get an actual diagnosis. Variant C is the most actionable and specific (it even mentions the option to stop over-fertilizing, which the other two don't), but its numbered format doesn't fit naturally into a single-line "Advice" input field in the UI — it reads better as a chat response than a compact field value. Variant B strikes the best balance: it stays a few flowing sentences (fits the UI), while still naming a concrete local resource (Krishi Vigyan Kendra) that neither A nor C's diagnosis step names as specifically.