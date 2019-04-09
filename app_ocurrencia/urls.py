from django.urls import path, include

urlpatterns = [
    path('security/', include('security.urls')),
    path('nomenclador/', include('nomenclador.urls')),
    path('ocurrencia/', include('ocurrencia.urls')),
    path('pendiente/', include('pendiente.urls'))
]
