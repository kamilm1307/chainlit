from typing import Any, Dict, List, Literal, Optional, TypedDict, Union

from dataclasses_json import DataClassJsonMixin
from pydantic import BaseModel
from pydantic.dataclasses import dataclass

from chainlit.prompt import PromptMessage

InputWidgetType = Literal["switch", "slider", "select", "textinput", "tags"]
ElementType = Literal[
    "image", "avatar", "text", "pdf", "tasklist", "audio", "video", "file"
]
ElementDisplay = Literal["inline", "side", "page"]
ElementSize = Literal["small", "medium", "large"]


@dataclass
class AskSpec(DataClassJsonMixin):
    """Specification for asking the user."""

    timeout: int
    type: Literal["text", "file"]


@dataclass
class AskFileSpec(AskSpec, DataClassJsonMixin):
    """Specification for asking the user for a file."""

    accept: Union[List[str], Dict[str, List[str]]]
    max_files: int
    max_size_mb: int


class AskResponse(TypedDict):
    content: str
    author: str


@dataclass
class AskFileResponse:
    name: str
    path: str
    size: int
    type: str
    content: bytes


class CompletionRequest(BaseModel):
    prompt: Optional[str] = None
    messages: Optional[List[PromptMessage]] = None
    userEnv: Dict[str, str]
    provider: str
    settings: Dict[str, Any]


class UpdateFeedbackRequest(BaseModel):
    messageId: str
    feedback: Literal[-1, 0, 1]


class DeleteConversationRequest(BaseModel):
    conversationId: str


class Pagination(BaseModel):
    first: int
    cursor: Any


class ConversationFilter(BaseModel):
    feedback: Optional[Literal[-1, 0, 1]]
    authorEmail: Optional[str]
    search: Optional[str]


class GetConversationsRequest(BaseModel):
    pagination: Pagination
    filter: ConversationFilter
