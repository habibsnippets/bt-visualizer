# Bradley–Terry Preference Learning Visualizer

Blog: https://habib.bearblog.dev/bradley-terry-model/


An interactive visualization of the **Bradley–Terry model** for learning latent reward / strength functions from **pairwise preference data**.

This project demonstrates how a scalar reward signal can be **inferred purely from comparisons**, a core idea behind modern **RLHF-style reward modeling**.

---

## Motivation

In many real-world settings (including human feedback for LLMs), it is difficult to assign absolute scores to items.
However, humans are often reliable at answering **pairwise questions**:

> “Which of these two is better?”

The Bradley–Terry model formalizes how latent scalar strengths induce probabilistic preferences, and how those strengths can be recovered via maximum likelihood estimation.

This project makes that process **explicit and visual**.


## What This App Does

1. **Define latent strengths**
   - Manually set “true” strengths using sliders

2. **Visualize preference probabilities**
   - Heatmap of probabilites for all pairs

3. **Generate noisy preference data**
   - Sample pairwise comparisons using the Bradley–Terry distribution

4. **Learn strengths from preferences**
   - Train a reward model via gradient-based MLE

5. **Compare true vs learned strengths**
   - Observe identifiability and ordering recovery

6. **Visualize training dynamics**
   - Loss curve (negative log-likelihood) rendered via SVG

---

## Key Insights Demonstrated

- Preferences are **probabilistic**, not deterministic  
- Weak items can occasionally beat strong ones (noise is fundamental)
- Only **relative differences** in reward matter (shift invariance)
- Rankings stabilize before absolute values converge
- Reward functions can emerge purely from comparisons

---

## Technical Details

- Model: Bradley–Terry (logistic pairwise model)
- Optimization: simple gradient descent
- Loss: average negative log-likelihood
- Identifiability: enforced via mean-zero constraint
- Visualization: React + SVG (no charting libraries)

---

## Running Locally

```bash
npm install
npm run dev

>>>>>>> a1073ef8266fef274c2a9b70a05dcb346b142530
