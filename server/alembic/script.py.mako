import datetime
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = ${repr(up_revision)}
down_revision: Union[str, None] = ${repr(down_revision)}
branch_labels: Union[str, Sequence[str], None] = ${repr(branch_labels)}
depends_on: Union[str, Sequence[str], None] = ${repr(depends_on)}
message: str = ${repr(message)}
create_date: datetime.datetime = ${repr(create_date)}


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
