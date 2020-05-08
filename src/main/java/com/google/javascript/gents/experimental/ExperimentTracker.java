package com.google.javascript.gents.experimental;

import com.google.common.collect.ImmutableSet;

/**
 * Used to maintain whether or not a run of Gents is using an experiment and, if so, which
 * experiment(s) are enabled.
 */
public class ExperimentTracker {

  /**
   * Records all known experiments. This should only include experiments that are actually used in
   * the codebase or are under development and will be soon used in the codebase.
   */
  public enum Experiment {
    // the current codebase does not have any active experiments
  }

  /** The current active experiments */
  private final ImmutableSet<Experiment> enabledExperiments;

  /**
   * Creates a tracker with the given experiments. Private to force the use of static builder
   * methods that are more fluent to improve clarity of what the built tracker does.
   *
   * @param enabledExperiments The experiments to enable or nothing to not enable any experiments.
   */
  private ExperimentTracker(Experiment... enabledExperiments) {
    this.enabledExperiments = ImmutableSet.copyOf(enabledExperiments);
  }

  /** Creates a tracker that doesn't have any experiments enabled. */
  public static ExperimentTracker withoutExperiments() {
    return new ExperimentTracker();
  }

  /** Creates a tracker with the specified experiments enabled. */
  public static ExperimentTracker withExperiments(Experiment... enabledExperiments) {
    return new ExperimentTracker(enabledExperiments);
  }

  /** Used to determine if the specified experiment is enabled for this tracker. */
  public boolean isEnabled(Experiment experiment) {
    return enabledExperiments.contains(experiment);
  }

  /** Used to determine if this tracker has any experiments enabled. */
  public boolean hasEnabledExperiments() {
    return !enabledExperiments.isEmpty();
  }
}
