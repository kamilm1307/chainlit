from typing import TYPE_CHECKING, Union

from chainlit.context import get_context
from chainlit.step import Step
from chainlit.sync import run_sync
from chainlit.utils import check_module_version
from literalai import ChatGeneration, CompletionGeneration

if not check_module_version("openai", "1.0.0"):
    raise ValueError(
        "Expected OpenAI version >= 1.0.0. Run `pip install openai --upgrade`"
    )


def instrument_openai():
    from literalai.instrumentation.openai import instrument_openai

    async def on_new_generation(
        generation: Union["ChatGeneration", "CompletionGeneration"], timing
    ):
        context = get_context()

        parent_id = None
        if context.current_step:
            parent_id = context.current_step.id
        elif context.session.root_message:
            parent_id = context.session.root_message.id

        step = Step(
            name=generation.settings.get("model", generation.provider)
            if generation.settings
            else generation.provider,
            type="llm",
            parent_id=parent_id,
        )
        step.generation = generation
        # Convert start/end time from seconds to milliseconds
        step.start = (
            timing.get("start") * 1000
            if timing.get("start", None) is not None
            else None
        )
        step.end = (
            timing.get("end") * 1000 if timing.get("end", None) is not None else None
        )

        if isinstance(generation, ChatGeneration):
            step.input = generation.messages
            step.output = generation.message_completion  # type: ignore
        else:
            step.input = generation.prompt
            step.output = generation.completion

        await step.send()

    def on_new_generation_sync(
        generation: Union["ChatGeneration", "CompletionGeneration"], timing
    ):
        run_sync(on_new_generation(generation, timing))

    instrument_openai(None, on_new_generation_sync)
