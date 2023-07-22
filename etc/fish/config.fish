if status is-interactive
    # Commands to run in interactive sessions can go here
    set -gx SITE_HOME $HOME/site
    fish_add_path $SITE_HOME/bin $SITE_HOME/server/bin
end
