# The Rise of Agentic AI

> Date: 2025-01-15
> Category: AI / Engineering
> Status: PUBLISHED

The shift from chat-based LLMs to autonomous agents marks a new era in software engineering.
We are moving from "asking" computers to "assigning" tasks.

## The Core Loop

1. **Perception**: Reading environment state (files, browser, terminal)
2. **Reasoning**: Planning the next step based on state
3. **Action**: Executing tools to change state
4. **Feedback**: Analyzing the output of the action

```python
while not task.complete:
    state = env.observe()
    plan = agent.think(state)
    result = agent.act(plan)
    agent.learn(result)
```

This loop mimics the OODA loop (Observe, Orient, Decide, Act) used in military strategy.

## Challenges

- **Hallucination**: Agents trying to run `rm -rf /` because they think it cleans cache.
- **Loops**: Agents getting stuck retrying the same failed command.
- **Context**: Managing the expanding context window over long tasks.

The future isn't just better models; it's better **scaffolding** around those models.
