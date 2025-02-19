from app import app, db
from app.models import login_form, login_info, option_record, option_info

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'login_form': login_form, 'login_info': login_info, 'option_record': option_record, 'option_info': option_info}