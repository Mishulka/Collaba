from django.http import HttpResponse

def home(request):
    return HttpResponse("""
    <html>
        <body>
            Hello! Если видишь этот текст, значит тулбар тоже должен быть справа 🚀
        </body>
    </html>
    """)
