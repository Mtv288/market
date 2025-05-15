import importlib
import pkgutil
from fastapi import APIRouter

router = APIRouter()


for _, module_name, _ in pkgutil.iter_modules(__path__):
    module = importlib.import_module(f"{__name__}.{module_name}")

    if hasattr(module, "router"):
        route = getattr(module, "router")
        if isinstance(route, APIRouter):
            router.include_router(route)