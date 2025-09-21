import strawberry

from ..config import get_settings


@strawberry.type
class ServerInfo:
    name: str
    version: str


@strawberry.type
class Query:
    @strawberry.field
    def info(self) -> ServerInfo:
        settings = get_settings()
        return ServerInfo(name=settings.app_name, version=settings.app_version)

    @strawberry.field
    def version(self) -> str:
        settings = get_settings()
        return settings.app_version


schema = strawberry.Schema(query=Query)
