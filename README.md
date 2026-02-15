<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# Bradley–Terry Preference Learning Visualizer

An interactive visualization of the **Bradley–Terry model** for learning latent reward / strength functions from **pairwise preference data**.

This project demonstrates how a scalar reward signal can be **inferred purely from comparisons**, a core idea behind modern **RLHF-style reward modeling**.

---

## Motivation

In many real-world settings (including human feedback for LLMs), it is difficult to assign absolute scores to items.
However, humans are often reliable at answering **pairwise questions**:

> “Which of these two is better?”

The Bradley–Terry model formalizes how latent scalar strengths induce probabilistic preferences, and how those strengths can be recovered via maximum likelihood estimation.

This project makes that process **explicit and visual**.

---

## Core Idea

Each item \( i \) has an unobserved real-valued strength \( \theta_i \).

The probability that item \( i \) is preferred over item \( j \) is:

\[
P(i \succ j) = \sigma(\theta_i - \theta_j)
\]

where \( \sigma \) is the logistic sigmoid.

The model:
- never observes \( \theta \) directly
- only sees noisy pairwise outcomes
- learns \( \hat{\theta} \) by maximizing likelihood

---

## What This App Does

1. **Define latent strengths**
   - Manually set “true” strengths using sliders

2. **Visualize preference probabilities**
   - Heatmap of \( P(i \succ j) \) for all pairs

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
