function __site_complete_tasks
  if not test "$__site_tasks"
    set -g __site_tasks (site tasks |tail -n +3 |cut -f1 -d ' ')
  end

  printf "%s\n" $__site_tasks
end

complete -c site -a "(__site_complete_tasks)" -d 'tasks'
