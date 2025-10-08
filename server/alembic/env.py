import pkgutil
from importlib import import_module

from alembic import context
from sqlmodel import SQLModel

from app.config import get_settings
from app.database import get_engine


def _import_sqlmodel_modules() -> None:
    for base_package in ("app",):
        try:
            package = import_module(base_package)
        except ModuleNotFoundError:
            continue
        package_path = getattr(package, "__path__", None)
        if package_path is None:
            continue
        for _, module_name, _ in pkgutil.walk_packages(
            package_path, f"{base_package}."
        ):
            if module_name.rsplit(".", 1)[-1] in {"model", "models"}:
                import_module(module_name)


config = context.config
settings = get_settings()
if config is not None:
    config.set_main_option("sqlalchemy.url", settings.database_url)

_import_sqlmodel_modules()

target_metadata = SQLModel.metadata


def run_migrations_offline() -> None:
    url = settings.database_url
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    engine = get_engine()
    with engine.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
